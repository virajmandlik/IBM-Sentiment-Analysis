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

  try {
    const response = await axios.post("http://localhost:5000/predict", {
      feeling,
      challenge,
      improve,
    });
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

    try {
      const response = await axios.post("http://localhost:5000/predict", { feeling: sentiment });
      results.push({
        name: name,
        sentiment: sentiment,
        status: response.data.overallSentiment,
      });
    } catch (error) {
      console.error(`Error processing ${name}:`, error.message);
      results.push({
        name: name,
        sentiment: sentiment,
        status: "Error processing sentiment",
      });
    }
  }

  res.json(results);
});

app.listen(3000, () => {
  console.log("Node.js server is running on port 3000");
});
