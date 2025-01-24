const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Route for Wellness Enthusiasts
app.post("/api/predict", async (req, res) => {
  const { feeling, challenge, improve } = req.body;
  console.log("The data received at backend is:", feeling, challenge, improve);

  try {
    const response = await axios.post("http://localhost:5000/predict", {
      feeling,
      challenge,
      improve,
    });
    console.log("The data sending from backend is:", response.data);
    
    // Forward the entire response from Flask to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error calling Flask API:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Route for Counselors to process CSV data
app.post("/api/predictPatientsSentiments", async (req, res) => {
  const csvData = req.body.csvData;
  console.log("Received CSV data at backend:", csvData);

  if (!csvData || csvData.length === 0) {
    return res.status(400).json({ error: "CSV data is empty or missing." });
  }

  const results = [];

  // Process each row of CSV data
  for (const row of csvData) {
    const sentiment = row.Sentiment;
    const name = row.Name;

    // Log the name and sentiment before sending to the model
    console.log(`Processing name: ${name}, sentiment: ${sentiment}`);

    try {
      // Send only the sentiment to the model
      const response = await axios.post("http://localhost:5000/predict", { feeling: sentiment });

      const result = {
        name: name,                       // Name of the user
        analyzedSentiment: response.data.overallSentiment, // Analyzed result from the model
      };

      // Push the result to the results array
      results.push(result);

      // Log the result being sent to the frontend
      console.log("Result sent to frontend:", result);
    } catch (error) {
      console.error(`Error processing ${name}:`, error.message);

      // Handle errors and include an error status for this entry
      const errorResult = {
        name: name,
        analyzedSentiment: "Error processing sentiment",
      };

      results.push(errorResult);

      // Log the error result being sent to the frontend
      console.log("Error result sent to frontend:", errorResult);
    }
  }

  // Send the results array to the frontend
  res.json(results);
});

app.listen(3000, () => {
  console.log("Node.js server is running on port 3000");
});