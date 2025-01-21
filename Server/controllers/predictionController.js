const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const { apiKey, scoringUrl, tokenUrl } = require("../config/ibmConfig");

function getToken() {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.open("POST", tokenUrl);
    req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    req.setRequestHeader("Accept", "application/json");
    req.onload = () => resolve(JSON.parse(req.responseText).access_token);
    req.onerror = () => reject(new Error("Error fetching token"));
    req.send(
      `grant_type=urn:ibm:params:oauth:grant-type:apikey&apikey=${apiKey}`
    );
  });
}

function getPrediction(token, payload) {
  return new Promise((resolve, reject) => {
    console.log("The payload being sent to IBM model:", JSON.stringify(payload, null, 2));  // Log the payload
    const req = new XMLHttpRequest();
    req.open("POST", scoringUrl);
    req.setRequestHeader("Authorization", `Bearer ${token}`);
    req.setRequestHeader("Content-Type", "application/json");
    req.onload = () => {
      const response = JSON.parse(req.responseText);
      console.log("Response from IBM model:", JSON.stringify(response, null, 2));  // Log the response
      resolve(response);
    };
    req.onerror = () => reject(new Error("Error during prediction"));
    req.send(JSON.stringify(payload));
  });
}

module.exports = async (req, res) => {
  try {
    console.log("The received data at backend is:", req.body);

    const { feeling, challenge, improve } = req.body;
    
    const token = await getToken();
    console.log("Token received:", token); 

    // Prepare the payload for each question separately
    const feelingPayload = {
      input_data: [
        { fields: ["Unnamed: 0", "statement"], values: [[1, feeling]] }
      ],
    };
    const challengePayload = {
      input_data: [
        { fields: ["Unnamed: 0", "statement"], values: [[1, challenge]] }
      ],
    };
    const improvePayload = {
      input_data: [
        { fields: ["Unnamed: 0", "statement"], values: [[1, improve]] }
      ],
    };

    // Log the payloads for each prediction
    console.log("Feeling Payload:", JSON.stringify(feelingPayload, null, 2));
    console.log("Challenge Payload:", JSON.stringify(challengePayload, null, 2));
    console.log("Improve Payload:", JSON.stringify(improvePayload, null, 2));

    // Get predictions for each individual question
    const feelingPrediction = await getPrediction(token, feelingPayload);
    const challengePrediction = await getPrediction(token, challengePayload);
    const improvePrediction = await getPrediction(token, improvePayload);

    // Log each prediction response
    console.log("Feeling Prediction:", JSON.stringify(feelingPrediction, null, 2));
    console.log("Challenge Prediction:", JSON.stringify(challengePrediction, null, 2));
    console.log("Improve Prediction:", JSON.stringify(improvePrediction, null, 2));

  // Safely extract sentiment predictions from predictions
const feelingSentiment = feelingPrediction?.predictions?.[0]?.values?.[0]?.[0] || "N/A";  // Feeling prediction
const challengeSentiment = challengePrediction?.predictions?.[0]?.values?.[0]?.[0] || "N/A";  // Challenge prediction
const improveSentiment = improvePrediction?.predictions?.[0]?.values?.[0]?.[0] || "N/A";  // Improve prediction

// Log individual sentiment values
console.log("Feeling Sentiment:", feelingSentiment);
console.log("Challenge Sentiment:", challengeSentiment);
console.log("Improve Sentiment:", improveSentiment);

    // Assuming the overall sentiment comes from the highest probability or feeling sentiment
    const overallSentiment = feelingSentiment;  // Change this if you want a different logic for overall sentiment

    // Send the final result back to frontend
    res.status(200).json({
      individualSentiments: {
        feelingSentiment,
        challengeSentiment,
        improveSentiment,
      },
      overallSentiment,
    });
  } catch (error) {
    console.error("Error during prediction:", error);
    res.status(500).json({ error: error.message });
  }
};

