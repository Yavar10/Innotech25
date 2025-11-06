const { db, storage } = require('../config/firebase');
const axios = require('axios');
const FormData = require('form-data');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');


// ============ UPLOAD AND SCAN IMAGE ============
exports.uploadAndScan = async (req, res) => {
  let uploadedFilePath = null;

  try {
    const { userId } = req.body;

    // Validate file upload
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded'
      });
    }

    // Validate userId
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

    console.log('🔄 Sending image to AI Model...');
    console.log('   File:', req.file.filename);
    console.log('   Size:', req.file.size, 'bytes');

    // Prepare form data for FastAPI
    const formData = new FormData();
    formData.append('file', fs.createReadStream(uploadedFilePath), {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    // Send to Python FastAPI - UPDATED
    const aiModelUrl = process.env.PYTHON_API_URL || 'http://localhost:8000';
    const predictUrl = `${aiModelUrl}/predict`;
    
    console.log('   Calling:', predictUrl);
    
    const aiResponse = await axios.post(predictUrl, formData, {
      headers: {
        ...formData.getHeaders(),
      },
      timeout: 30000,
      maxContentLength: Infinity,
      maxBodyLength: Infinity
    });

    console.log('✅ AI Model Response received');
    console.log('   Prediction:', aiResponse.data.prediction_class);
    console.log('   Confidence:', (aiResponse.data.confidence * 100).toFixed(2) + '%');

    // Generate scan ID and timestamp
    const scanId = uuidv4();
    const timestamp = new Date().toISOString();

    // Map FastAPI response to our database schema
    const diseaseData = {
      scanId,
      userId,
      imageUrl: req.file.filename,
      imagePath: uploadedFilePath,
      
      // AI Model fields
      predictionClass: aiResponse.data.prediction_class,
      crop: aiResponse.data.crop,
      disease: aiResponse.data.disease,
      symptoms: aiResponse.data.symptoms,
      treatment: aiResponse.data.treatment,
      precautions: aiResponse.data.precautions,
      confidence: aiResponse.data.confidence,
      
      // Metadata
      scannedAt: timestamp,
      status: 'completed'
    };

    // Save to Firebase Realtime Database
    const scansRef = db.ref('diseaseScans');
    await scansRef.child(scanId).set(diseaseData);

    // Add to user's disease history (compact version)
    const userHistoryRef = db.ref(`users/${userId}/diseaseHistory`);
    await userHistoryRef.child(scanId).set({
      scanId,
      predictionClass: diseaseData.predictionClass,
      crop: diseaseData.crop,
      disease: diseaseData.disease,
      confidence: diseaseData.confidence,
      scannedAt: timestamp
    });

    console.log('✅ Scan saved to Firebase with ID:', scanId);

    // Return formatted response
    res.status(201).json({
      message: 'Scan completed successfully',
      scan: diseaseData,
      summary: {
        crop: diseaseData.crop,
        disease: diseaseData.disease,
        confidence: `${(diseaseData.confidence * 100).toFixed(2)}%`,
        treatment_available: !!diseaseData.treatment
      }
    });

  } catch (error) {
    console.error('❌ Upload and scan error:', error.message);

    // Clean up uploaded file on error
    if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
      try {
        fs.unlinkSync(uploadedFilePath);
        console.log('🗑️  Cleaned up uploaded file');
      } catch (cleanupError) {
        console.error('Failed to cleanup file:', cleanupError.message);
      }
    }

    // Handle different error types
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        error: 'AI Model service unavailable',
        details: 'Python FastAPI backend is not accessible. Check PYTHON_API_URL environment variable.'
      });
    }

    if (error.code === 'ETIMEDOUT') {
      return res.status(504).json({
        error: 'Request timeout',
        details: 'AI Model took too long to respond'
      });
    }

    if (error.response?.data) {
      return res.status(error.response.status || 500).json({
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
        message: 'No scans found',
        totalScans: 0,
        scans: []
      });
    }

    const scans = [];
    snapshot.forEach((child) => {
      scans.push(child.val());
    });

    // Sort by date (most recent first)
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

    // Delete from user's history
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
      stats.cropTypes[scan.crop] = (stats.cropTypes[scan.crop] || 0) + 1;

      // Count diseases
      if (scan.disease.toLowerCase().includes('healthy')) {
        stats.healthyScans++;
      } else {
        stats.diseaseTypes[scan.disease] = (stats.diseaseTypes[scan.disease] || 0) + 1;
        stats.diseasesFound++;
      }

      // Sum confidence
      totalConfidence += scan.confidence || 0;
    });

    stats.averageConfidence = (totalConfidence / scans.length).toFixed(2);

    res.json(stats);
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      error: 'Failed to fetch statistics',
      details: error.message
    });
  }
};
