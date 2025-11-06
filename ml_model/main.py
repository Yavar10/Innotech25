from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io
import json
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="FarmVision AI Model API",
    description="Crop Disease Detection using Deep Learning",
    version="1.0.0"
)

# CORS middleware - Allow Node.js backend to call this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your Node.js backend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load your trained model
try:
    logger.info("Loading PlantDetectionModel.h5...")
    model = load_model("PlantDetectionModel.h5")
    logger.info("✅ Model loaded successfully!")
except Exception as e:
    logger.error(f"❌ Failed to load model: {e}")
    model = None

# Class labels (same as your training)
class_labels = [
    'Pepper__bell___Bacterial_spot', 
    'Pepper__bell___healthy', 
    'Potato___Early_blight', 
    'Potato___healthy', 
    'Potato___Late_blight',
    'Tomato_Bacterial_spot', 
    'Tomato_Early_blight', 
    'Tomato_healthy',
    'Tomato_Late_blight', 
    'Tomato_Leaf_Mold', 
    'Tomato_Septoria_leaf_spot',
    'Tomato_Spider_mites_Two_spotted_spider_mite', 
    'Tomato__Target_Spot',
    'Tomato__Tomato_mosaic_virus', 
    'Tomato__Tomato_YellowLeaf__Curl_Virus'
]

# Load treatment info JSON
try:
    with open("treatment_data.json", "r") as f:
        disease_info = json.load(f)
    logger.info(f"✅ Disease data loaded: {len(disease_info)} classes")
except FileNotFoundError:
    logger.error("❌ treatment_data.json not found")
    disease_info = {}


@app.get("/")
def root():
    """Root endpoint with API information"""
    return {
        "message": "🌾 FarmVision AI Model API",
        "version": "1.0.0",
        "status": "active",
        "model_loaded": model is not None,
        "available_classes": len(class_labels),
        "endpoints": {
            "predict": "/predict",
            "health": "/health"
        }
    }


@app.get("/health")
def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy" if model is not None else "degraded",
        "model": "loaded" if model is not None else "not loaded",
        "available_classes": len(disease_info)
    }


@app.post("/predict")
async def predict_disease(file: UploadFile = File(...)):
    """
    Predict disease from uploaded crop image
    
    Returns response format compatible with Node.js backend:
    {
        "prediction_class": str,
        "confidence": float,
        "crop": str,
        "disease": str,
        "symptoms": str,
        "treatment": {...},
        "precautions": str
    }
    """
    try:
        # Check if model is loaded
        if model is None:
            raise HTTPException(
                status_code=503,
                detail="Model not loaded. Please check server logs."
            )
        
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(
                status_code=400,
                detail="File must be an image"
            )
        
        logger.info(f"Processing image: {file.filename}")
        
        # Read and preprocess image
        image_data = await file.read()
        img = Image.open(io.BytesIO(image_data)).convert("RGB")
        img = img.resize((128, 128))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        
        # Predict
        logger.info("Running model prediction...")
        prediction = model.predict(img_array)
        predicted_class_idx = np.argmax(prediction)
        predicted_label = class_labels[predicted_class_idx]
        confidence = float(np.max(prediction))
        
        logger.info(f"Prediction: {predicted_label} (confidence: {confidence:.2%})")
        
        # Get disease data
        if predicted_label not in disease_info:
            logger.warning(f"Disease '{predicted_label}' not found in treatment_data.json")
            return {
                "prediction_class": predicted_label,
                "confidence": confidence,
                "crop": "Unknown",
                "disease": predicted_label.replace('_', ' '),
                "symptoms": "No information available",
                "treatment": {
                    "chemical": "Consult agricultural expert",
                    "organic": "Consult agricultural expert",
                    "schedule": "N/A",
                    "quantity": "N/A"
                },
                "precautions": "Consult with local agricultural extension service"
            }
        
        data = disease_info[predicted_label]
        
        # Format response for Node.js backend
        response = {
            "prediction_class": predicted_label,
            "confidence": round(confidence, 4),
            "crop": data.get("crop", "Unknown"),
            "disease": data.get("disease", "Unknown"),
            "symptoms": data.get("symptoms", "N/A"),
            "treatment": data.get("treatment", {}),
            "precautions": data.get("precautions", "N/A")
        }
        
        logger.info(f"✅ Prediction successful")
        return response
        
    except HTTPException as he:
        raise he
    except Exception as e:
        logger.error(f"❌ Prediction failed: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    
    logger.info("🚀 Starting FarmVision AI Model API...")
    logger.info(f"📊 Model: {'Loaded' if model else 'Not Loaded'}")
    logger.info(f"📚 Disease Classes: {len(class_labels)}")
    
    uvicorn.run(
        app, 
        host="0.0.0.0", 
        port=8000,
        log_level="info"
    )