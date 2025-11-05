from fastapi import FastAPI, UploadFile, File
from tensorflow.keras.models import load_model
from PIL import Image
import numpy as np
import io
import json

app = FastAPI()

# Load your trained model
model = load_model("PlantDetectionModel.h5")

# Class labels (same as your training)
class_labels = [
    'Pepper__bell___Bacterial_spot', 'Pepper__bell___healthy', 'PlantVillage',
    'Potato___Early_blight', 'Potato___healthy', 'Potato___Late_blight',
    'Tomato_Bacterial_spot', 'Tomato_Early_blight', 'Tomato_healthy',
    'Tomato_Late_blight', 'Tomato_Leaf_Mold', 'Tomato_Septoria_leaf_spot',
    'Tomato_Spider_mites_Two_spotted_spider_mite', 'Tomato__Target_Spot',
    'Tomato__Tomato_mosaic_virus', 'Tomato__Tomato_YellowLeaf__Curl_Virus'
]

# Load treatment info JSON
with open("treatment_data.json", "r") as f:
    disease_info = json.load(f)


@app.post("/predict")
async def predict_disease(file: UploadFile = File(...)):
    # Read image
    image_data = await file.read()
    img = Image.open(io.BytesIO(image_data)).convert("RGB")
    img = img.resize((128, 128))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    # Predict
    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction)
    predicted_label = class_labels[predicted_class]

    # Get disease data
    data = disease_info.get(predicted_label, {"message": "No details found for this disease."})

    return {
        "predicted_class": predicted_label,
        "confidence": float(np.max(prediction)),
        "details": data
    }
