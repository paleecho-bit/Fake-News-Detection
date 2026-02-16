# Fake News Detection System

## Overview
In the digital era, the rapid spread of misinformation through social media and online platforms makes it difficult to distinguish between real and fake news. This project builds a Machine Learning-based Fake News Detection System that classifies news articles as **Real** or **Fake** using Natural Language Processing (NLP) techniques.

The system provides a simple API where users can input news content and receive instant predictions.

## Features
- Text preprocessing (tokenization, stopword removal)
- TF-IDF Vectorization
- Machine Learning model for classification
- REST API built using Flask
- Real-time prediction for user input

## Tech Stack
- Python
- Flask
- Scikit-learn
- Pandas
- NumPy
- Natural Language Processing (NLP)


## Project Structure
Fake-News-Detection
│
├── app.py # Flask API
├── train_model.py # Model training script
├── fake_news_model.pkl # Trained ML model
├── tfidf.pkl # TF-IDF vectorizer
├── requirements.txt # Dependencies
└── README.md

##  Dataset
Dataset used: Fake and True News Dataset  
(Source: Kaggle)
Note: Dataset files are not uploaded due to large file size.

## Installation & Setup

1. Clone the repository:
   git clone https://github.com/your-username/Fake-News-Detection.git
   cd Fake-News-Detection

2. Install dependencies:
   pip install -r requirements.txt

3. Run the application:
   python app.py

4. Open browser:
   http://127.0.0.1:5000/

   
## API Usage

### Endpoint:
    POST /predict

## Applications
- Educational institutions
- Media organizations
- Social media platforms
- Fact-checking systems







