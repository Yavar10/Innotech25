const { db, storage } = require('../config/firebase');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');

// ============ UPLOAD AND SCAN IMAGE ============
exports.uploadAndScan = async (req, res) => {
  let uploadedFilePath = null;

  try {
    const { userId } = req.body;

    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded'
      });
    }

    if (!userId) {
      return res.status(400).json({
        error: 'User ID is required'
      });
    }

    uploadedFilePath = req.file.path;

    // Verify user exists
    const userRef = db.ref(`users/${userId}`);
    const userSnapshot = await userRef.once('value');

    if (!userSnapshot.exists()) {
      fs.unlinkSync(uploadedFilePath);
      return res.status(404).json({
        error: 'User not found'
      });
    }

    // Send to Python FastAPI for disease prediction
    const formData = new FormData();
    formData.append('file', fs.createReadStream(uploadedFilePath));

    console.log('🔄 Sending image to AI Model:', process.env.AI_MODEL_URL);

    const aiResponse = await axios.post(
      process.env.AI_MODEL_URL,
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 30000
      }
    );

    console.log('✅ AI Model Response:', aiResponse.data);

    // Generate scan ID
    const scanId = uuidv4();
    const timestamp = new Date().toISOString();

    // Prepare disease data
    const diseaseData = {
      scanId,
      userId,
      imageUrl: req.file.filename,
      imagePath: uploadedFilePath,
      predictionClass: 
        aiResponse.data.prediction_class || 
        aiResponse.data.predictionClass || 
        'Unknown',
      crop: aiResponse.data.crop || 'Unknown',
      disease: aiResponse.data.disease || 'Unknown',
      symptoms: aiResponse.data.symptoms || 'N/A',
      treatment: aiResponse.data.treatment || {},
      precautions: aiResponse.data.precautions || 'N/A',
      confidence: aiResponse.data.confidence || 0,
      scannedAt: timestamp,
      status: 'completed'
    };

    // Save to Firebase Realtime Database
    const scansRef = db.ref('diseaseScans');
    await scansRef.child(scanId).set(diseaseData);

    // Add to user's disease history
    const userHistoryRef = db.ref(`users/${userId}/diseaseHistory`);
    await userHistoryRef.child(scanId).set({
      scanId,
      predictionClass: diseaseData.predictionClass,
      crop: diseaseData.crop,
      disease: diseaseData.disease,
      scannedAt: timestamp
    });

    console.log('✅ Scan saved with ID:', scanId);

    res.status(201).json({
      message: 'Scan completed successfully',
      scan: diseaseData
    });

  } catch (error) {
    console.error('Upload and scan error:', error);

    // Clean up uploaded file
    if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
      fs.unlinkSync(uploadedFilePath);
    }

    if (error.response?.data) {
      return res.status(500).json({
        error: 'AI Model error',
        details: error.response.data
      });
    }

    res.status(500).json({
      error: 'Failed to process image',
      details: error.message
    });
  }
};

// ============ GET USER'S DISEASE HISTORY ============
exports.getUserDiseaseHistory = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify user exists
    const userRef = db.ref(`users/${userId}`);
    const userSnapshot = await userRef.once('value');

    if (!userSnapshot.exists()) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    // Get disease scans for user
    const scansRef = db.ref('diseaseScans');
    const snapshot = await scansRef
      .orderByChild('userId')
      .equalTo(userId)
      .once('value');

    if (!snapshot.exists()) {
      return res.json({
        message: 'No scans found',
        totalScans: 0,
        scans: []
      });
    }

    const scans = [];
    snapshot.forEach((child) => {
      scans.push(child.val());
    });

    // Sort by scannedAt (most recent first)
    scans.sort((a, b) => new Date(b.scannedAt) - new Date(a.scannedAt));

    res.json({
      message: 'Disease history retrieved successfully',
      totalScans: scans.length,
      scans
    });
  } catch (error) {
    console.error('Get disease history error:', error);
    res.status(500).json({
      error: 'Failed to fetch disease history',
      details: error.message
    });
  }
};

// ============ GET SPECIFIC SCAN BY ID ============
exports.getScanById = async (req, res) => {
  try {
    const { scanId } = req.params;

    const scanRef = db.ref(`diseaseScans/${scanId}`);
    const snapshot = await scanRef.once('value');

    if (!snapshot.exists()) {
      return res.status(404).json({
        error: 'Scan not found'
      });
    }

    res.json(snapshot.val());
  } catch (error) {
    console.error('Get scan error:', error);
    res.status(500).json({
      error: 'Failed to fetch scan',
      details: error.message
    });
  }
};

// ============ DELETE SCAN ============
exports.deleteScan = async (req, res) => {
  try {
    const { scanId } = req.params;

    const scanRef = db.ref(`diseaseScans/${scanId}`);
    const snapshot = await scanRef.once('value');

    if (!snapshot.exists()) {
      return res.status(404).json({
        error: 'Scan not found'
      });
    }

    const scan = snapshot.val();
    const userId = scan.userId;

    // Delete from diseaseScans
    await scanRef.remove();

    // Delete from user's disease history
    const userHistoryRef = db.ref(`users/${userId}/diseaseHistory/${scanId}`);
    await userHistoryRef.remove();

    // Delete image file if exists
    if (scan.imagePath && fs.existsSync(scan.imagePath)) {
      fs.unlinkSync(scan.imagePath);
    }

    res.json({
      message: 'Scan deleted successfully'
    });
  } catch (error) {
    console.error('Delete scan error:', error);
    res.status(500).json({
      error: 'Failed to delete scan',
      details: error.message
    });
  }
};

// ============ GET DISEASE STATISTICS ============
exports.getDiseaseStats = async (req, res) => {
  try {
    const { userId } = req.params;

    // Verify user exists
    const userRef = db.ref(`users/${userId}`);
    const userSnapshot = await userRef.once('value');

    if (!userSnapshot.exists()) {
      return res.status(404).json({
        error: 'User not found'
      });
    }

    const scansRef = db.ref('diseaseScans');
    const snapshot = await scansRef
      .orderByChild('userId')
      .equalTo(userId)
      .once('value');

    if (!snapshot.exists()) {
      return res.json({
        totalScans: 0,
        healthyScans: 0,
        diseasesFound: 0,
        cropTypes: {},
        diseaseTypes: {},
        averageConfidence: 0
      });
    }

    const scans = [];
    snapshot.forEach((child) => {
      scans.push(child.val());
    });

    // Calculate statistics
    const stats = {
      totalScans: scans.length,
      healthyScans: 0,
      diseasesFound: 0,
      cropTypes: {},
      diseaseTypes: {},
      averageConfidence: 0,
      recentScans: scans.slice(0, 5)
    };

    let totalConfidence = 0;

    scans.forEach((scan) => {
      // Count crops
      stats.cropTypes[scan.crop] = 
        (stats.cropTypes[scan.crop] || 0) + 1;

      // Count diseases
      if (scan.disease !== 'Healthy Crop') {
        stats.diseaseTypes[scan.disease] = 
          (stats.diseaseTypes[scan.disease] || 0) + 1;
        stats.diseasesFound++;
      } else {
        stats.healthyScans++;
      }

      // Average confidence
      totalConfidence += scan.confidence || 0;
    });

    stats.averageConfidence = 
      (totalConfidence / scans.length).toFixed(2);

    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch statistics',
      details: error.message
    });
  }
};

// ============ GET ALL SCANS (ADMIN) ============
exports.getAllScans = async (req, res) => {
  try {
    const scansRef = db.ref('diseaseScans');
    const snapshot = await scansRef.once('value');

    if (!snapshot.exists()) {
      return res.json({
        totalScans: 0,
        scans: []
      });
    }

    const scans = [];
    snapshot.forEach((child) => {
      scans.push(child.val());
    });

    scans.sort((a, b) => new Date(b.scannedAt) - new Date(a.scannedAt));

    res.json({
      totalScans: scans.length,
      scans
    });
  } catch (error) {
    console.error('Get all scans error:', error);
    res.status(500).json({
      error: 'Failed to fetch scans',
      details: error.message
    });
  }
};
