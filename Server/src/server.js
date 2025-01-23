const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON body

// Route to handle prediction
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



// Route to handle sentiment prediction from CSV data
app.post("/api/predictPatientsSentiments", async (req, res) => {
    const csvData = req.body.csvData; // The parsed CSV data sent from the frontend
  console.log("the csv pardes data at backend is ",csvData)
    if (!csvData || csvData.length === 0) {
      return res.status(400).json({ error: "CSV data is empty or missing." });
    }
  
    const results = [];
  
    // Process each row of CSV data
    for (const row of csvData) {
      const sentiment = row.Sentiment; // Assuming "Sentiment" is the column in the CSV
      const name = row.Name;
      const age = row.Age;
  
      try {
        // Send the sentiment to the Flask API for analysis
        const response = await axios.post("http://localhost:5000/predict", { feeling: sentiment });
  
        results.push({
          name: name,
          sentiment: sentiment,
          status: response.data.overallSentiment, // Status from model
        });
      } catch (error) {
        console.error("Error calling model API:", error);
        results.push({
          name: name,
          sentiment: sentiment,
          status: "Error processing sentiment",
        });
      }
    }
  
    // Return results to the frontend
    res.json(results);
  });

app.listen(3000, () => {
    console.log("Node.js server is running on port 3000");
});
