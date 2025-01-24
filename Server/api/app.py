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
    """Predict the sentiment of the given text."""
    inputs = tokenizer(text, return_tensors="pt", truncation=True, padding=True, max_length=128).to(device)
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
    predicted_class_idx = torch.argmax(logits, dim=1).cpu().numpy()[0]
    predicted_label = label_encoder.inverse_transform([predicted_class_idx])[0]
    return predicted_label

@app.route("/predict", methods=["POST"])
def predict():
    """Handle sentiment analysis requests."""
    data = request.json
    feeling = data.get("feeling", "")
    challenge = data.get("challenge", "")
    improve = data.get("improve", "")
    checkCaption = data.get("checkCaption", "")

    print("The data received at backend is:", feeling, challenge, improve, checkCaption)

    # If checkCaption is provided, only analyze it
    if checkCaption:
        try:
            sentiment = predict_sentiment(checkCaption)
            print("CheckCaption Sentiment:", sentiment)  # Debugging
            return jsonify({"overallSentiment": sentiment})  # Send only overallSentiment
        except Exception as e:
            print(f"Error analyzing checkCaption: {e}")
            return jsonify({"error": "Error analyzing checkCaption"}), 500
    else:
        # If no checkCaption, analyze the other fields
        if not feeling and not challenge and not improve:
            return jsonify({"error": "At least one of feeling, challenge, or improve is required."}), 400
        
        # Analyze sentiments individually for feeling, challenge, and improve
        individual_sentiments = {
            "feelingSentiment": predict_sentiment(feeling) if feeling else None,
            "challengeSentiment": predict_sentiment(challenge) if challenge else None,
            "improveSentiment": predict_sentiment(improve) if improve else None,
        }

        # Overall sentiment (combining feeling, challenge, improve)
        overall_sentiment = predict_sentiment(feeling + " " + challenge + " " + improve)

        response_data = {
            "individualSentiments": individual_sentiments,
            "overallSentiment": overall_sentiment,
        }

        print("Flask response data:", response_data)  # Debug print
        return jsonify(response_data)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
