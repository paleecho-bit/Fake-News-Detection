from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import random
import os
from PIL import Image
import PyPDF2
import docx
import json
import requests
import base64



app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# 1. Get the directory where app.py lives (the backend folder)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# 2. Get the PROJECT ROOT (one level up from backend)
PROJECT_ROOT = os.path.dirname(BASE_DIR)

# 3. Load model and vectorizer from the current (backend) folder
model = pickle.load(open(os.path.join(BASE_DIR, "model.pkl"), "rb"))
vectorizer = pickle.load(open(os.path.join(BASE_DIR, "vectorizer.pkl"), "rb"))

# 4. Load datasets from the root's dataset folder
# We use PROJECT_ROOT here because 'dataset' is NOT inside 'backend'
true_path = os.path.join(PROJECT_ROOT, "dataset", "True.csv")
fake_path = os.path.join(PROJECT_ROOT, "dataset", "Fake.csv")

true_news = pd.read_csv(true_path)
fake_news = pd.read_csv(fake_path)
@app.route("/")
def home():
    return "Fake News Detection API is Running 🚀"
@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()
    text = data["text"]

    # transform text
    text_vector = vectorizer.transform([text])

    # prediction
    prediction = model.predict(text_vector)[0]
    prob = model.predict_proba(text_vector)[0]

    if prediction == 0:
        result = "Fake"
        confidence = round(prob[0]*100,2)
    else:
        result = "Real"
        confidence = round(prob[1]*100,2)

    return jsonify({
        "prediction": result,
        "confidence": confidence
    })
@app.route("/example/real")
def get_real_example():

    row = true_news.sample(1).iloc[0]

    text = row["text"]

    # take only first sentence
    sentences = text.split(".")
    sentence = sentences[0:2]
    sentence = ".".join(sentence) + "."

    return jsonify({
        "text": sentence
    })


@app.route("/example/fake")
def get_fake_example():

    row = fake_news.sample(1).iloc[0]

    text = row["text"]

    sentence = text.split(".")[0] + "."

    return jsonify({
        "text": sentence
    })
def extract_text_from_image(file):
    api_key = os.getenv("VISION_API_KEY") 
    
    # 🚨 FIX 1: Reset file pointer to the beginning before reading
    file.seek(0) 
    
    image_content = base64.b64encode(file.read()).decode()

    url = f"https://vision.googleapis.com/v1/images:annotate?key={api_key}"
    body = {
        "requests": [
            {
                "image": {"content": image_content},
                "features": [{"type": "TEXT_DETECTION"}]
            }
        ]
    }

    try:
        response = requests.post(url, json=body)
        result = response.json()
        
        # 🚨 FIX 2: Better error handling for the API response
        if "responses" in result and result["responses"]:
            annotations = result["responses"][0].get("fullTextAnnotation")
            if annotations:
                return annotations["text"]
    except Exception as e:
        print(f"Vision API Error: {e}")
        
    return ""
@app.route('/upload', methods=['POST'])
def upload_file():

    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"})

    file = request.files['file']

    if file.filename == "":
        return jsonify({"error": "No file selected"})

    filename = file.filename.lower()
    text = ""

    try:

        # TXT
        if filename.endswith('.txt'):
            text = file.read().decode('utf-8')

        # PDF
        elif filename.endswith('.pdf'):
            pdf = PyPDF2.PdfReader(file)
            for page in pdf.pages:
                text += page.extract_text() or ""

        # DOCX
        elif filename.endswith('.docx'):
            doc = docx.Document(file)
            for para in doc.paragraphs:
                text += para.text + "\n"

        # IMAGE (OCR)
        elif filename.endswith(('.png', '.jpg', '.jpeg')):
            text = extract_text_from_image(file)
            print(f"DEBUG: Extracted text length: {len(text)}")
          

        # 🚨 IMPORTANT CHECK
        if not text.strip():
            return jsonify({"error": "No text detected in file"})

        return jsonify({"text": text})

    except Exception as e:
        print("UPLOAD ERROR:", e)
        return jsonify({"error": "Failed to process file"})
    
    # ================= SETTINGS STORAGE =================
settings_data = {
    "darkMode": True,
    "autoAnalyze": False,
    "notifications": True
}

# GET SETTINGS
@app.route("/settings", methods=["GET"])
def get_settings():
    return jsonify(settings_data)

# SAVE SETTINGS
@app.route("/settings", methods=["POST"])
def save_settings():
    global settings_data
    settings_data = request.get_json()
    return jsonify({"message": "Settings saved"})
if __name__ == "__main__":
    app.run(debug=True)