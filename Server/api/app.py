from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import BertTokenizer, BertForSequenceClassification
import torch
import pickle

app = Flask(__name__)
CORS(app)

# Load model and tokenizer
model_path = "./model/sentiment_model"
model = BertForSequenceClassification.from_pretrained(model_path)
tokenizer = BertTokenizer.from_pretrained(model_path)
model.eval()

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# Load label encoder
with open("./model/sentiment_model/label_encoder.pkl", "rb") as f:
    label_encoder = pickle.load(f)

def predict_sentiment(text):
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128).to(device)
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
    predicted_class_idx = torch.argmax(logits, dim=1).cpu().numpy()[0]
    predicted_label = label_encoder.inverse_transform([predicted_class_idx])[0]
    return predicted_label

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    feeling = data.get("feeling", "")

    if not feeling:
        return jsonify({"error": "Empty input"}), 400

    try:
        overall_sentiment = predict_sentiment(feeling)
        return jsonify({"overallSentiment": overall_sentiment})
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "Prediction error"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
