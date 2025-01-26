from flask import Flask, request, jsonify
from ibm_watson import NaturalLanguageUnderstandingV1
from ibm_watson.natural_language_understanding_v1 import Features, SentimentOptions
from ibm_cloud_sdk_core.authenticators import IAMAuthenticator


from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Get credentials from environment variables
api_key = os.getenv("IBM_API_KEY")
url = os.getenv("IBM_URL")

if not api_key or not url:
    raise ValueError("API key or URL is not set in the environment variables")
# Initialize Flask app
app = Flask(__name__)

# IBM Watson NLU initialization
authenticator = IAMAuthenticator(api_key)
nlu = NaturalLanguageUnderstandingV1(version="2021-08-01", authenticator=authenticator)
nlu.set_service_url(url)

# Function to get sentiment
def get_sentiment(text):
    response = nlu.analyze(
        text=text,
        features=Features(sentiment=SentimentOptions())
    ).get_result()
    sentiment = response["sentiment"]["document"]["label"]
    return sentiment

@app.route('/analyze_sentiment', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()  # Get data sent from Node.js server
    statement = data.get("statement", "")
    
    if not statement:
        return jsonify({"error": "No statement provide  d"}), 400

    sentiment = get_sentiment(statement)
    return jsonify({"sentiment": sentiment})

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)  # Runs Flask API on localhost port 5000
