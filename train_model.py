import pandas as pd
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

print("Loading dataset...")

fake = pd.read_csv("Fake.csv")
true = pd.read_csv("True.csv")

fake["label"] = 0
true["label"] = 1

data = pd.concat([fake, true])
data = data.sample(frac=1, random_state=42).reset_index(drop=True)

data["content"] = data["title"] + " " + data["text"]

X = data["content"]
y = data["label"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

print("Vectorizing...")

tfidf = TfidfVectorizer(stop_words="english", max_df=0.7)
X_train_tfidf = tfidf.fit_transform(X_train)

print("Training model...")

model = LogisticRegression(max_iter=1000)
model.fit(X_train_tfidf, y_train)

print("Saving files...")

with open("fake_news_model.pkl", "wb") as f:
    pickle.dump(model, f)

with open("tfidf.pkl", "wb") as f:
    pickle.dump(tfidf, f)

print("✅ Training complete!")
