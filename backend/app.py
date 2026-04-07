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

# load model and vectorizer
model = pickle.load(open("model.pkl","rb"))
vectorizer = pickle.load(open("vectorizer.pkl","rb"))

true_news = pd.read_csv("dataset/True.csv")
fake_news = pd.read_csv("dataset/Fake.csv")

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
    api_key = os.getenv("VISION_API_KEY")  # temporary for testing

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

    response = requests.post(url, json=body)
    result = response.json()

    try:
        return result["responses"][0]["fullTextAnnotation"]["text"]
    except:
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