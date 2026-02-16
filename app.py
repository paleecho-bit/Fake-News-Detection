from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)

# Load model and vectorizer
model = pickle.load(open("fake_news_model.pkl", "rb"))
vectorizer = pickle.load(open("tfidf.pkl", "rb"))

@app.route("/")
def home():
    return "Fake News Detection API is running"

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    text = data["text"]

    text_vector = vectorizer.transform([text])
    prediction = model.predict(text_vector)[0]

    result = "Real" if prediction == 1 else "Fake"
    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(debug=True)
