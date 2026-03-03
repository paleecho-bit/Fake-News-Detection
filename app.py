import os
import pickle
import logging
import pandas as pd
from flask import Flask, request, render_template, jsonify

app = Flask(__name__)

# ---------------- CONFIGURATION ----------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

model_path = os.path.join(BASE_DIR, "fake_news_model.pkl")
vectorizer_path = os.path.join(BASE_DIR, "tfidf.pkl")

# ---------------- LOGGING SETUP ----------------
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(levelname)s - %(message)s"
)

# ---------------- LOAD MODEL ----------------
try:
    model = pickle.load(open(model_path, "rb"))
    vectorizer = pickle.load(open(vectorizer_path, "rb"))
    logging.info("Model and Vectorizer loaded successfully.")
except Exception as e:
    logging.error(f"Error loading model: {e}")
    raise e

# ---------------- LOAD DATA FOR EXAMPLES ----------------
fake_df = pd.read_csv("Fake.csv")
true_df = pd.read_csv("True.csv")

# ---------------- HOME ROUTE ----------------
@app.route("/")
def home():
    return render_template("index.html")

# ---------------- HEALTH CHECK ROUTE ----------------
@app.route("/health")
def health():
    return jsonify({
        "status": "running",
        "model_loaded": True
    })

# ---------------- MODEL INFO ROUTE ----------------
@app.route("/model-info")
def model_info():
    return jsonify({
        "vectorizer": "TF-IDF",
        "classifier": type(model).__name__,
        "classes": ["Fake", "Real"]
    })

# ---------------- EXAMPLE ROUTE ----------------
@app.route("/example/<type>")
def example(type):
    if type == "fake":
        news = fake_df.sample(1).iloc[0]["text"]
    else:
        news = true_df.sample(1).iloc[0]["text"]

    news = news.replace("\n", " ")
    news = news.split(". ")[0] + "."

    return render_template("index.html", example_news=news)

# ---------------- PREDICT ROUTE (WEB) ----------------
@app.route("/predict", methods=["POST"])
def predict():
    news = request.form.get("news")

    if not news or len(news.strip()) < 20:
        logging.warning("Invalid input received.")
        return render_template("index.html", error="Please enter at least 20 characters.")

    vect = vectorizer.transform([news])
    probs = model.predict_proba(vect)[0]

    fake_prob = round(probs[0] * 100, 2)
    real_prob = round(probs[1] * 100, 2)

    prediction_raw = model.predict(vect)[0]
    prediction = "REAL NEWS" if prediction_raw == 1 else "FAKE NEWS"

    logging.info(f"Prediction made: {prediction}")

    return render_template(
        "result.html",
        news=news,
        prediction=prediction,
        fake_prob=fake_prob,
        real_prob=real_prob
    )

# ---------------- PREDICT ROUTE (API) ----------------
@app.route("/api/predict", methods=["POST"])
def api_predict():
    data = request.get_json()

    if not data or "news" not in data:
        return jsonify({"error": "Invalid request"}), 400

    news = data["news"]

    if len(news.strip()) < 20:
        return jsonify({"error": "Text too short"}), 400

    vect = vectorizer.transform([news])
    probs = model.predict_proba(vect)[0]

    response = {
        "prediction": "REAL" if model.predict(vect)[0] == 1 else "FAKE",
        "real_probability": round(probs[1] * 100, 2),
        "fake_probability": round(probs[0] * 100, 2)
    }

    return jsonify(response)

# ---------------- RUN APP ----------------
if __name__ == "__main__":
    app.run()