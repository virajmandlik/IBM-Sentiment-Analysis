const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const port = 4000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Define API key and URL for IBM Watson
const apiKey = "uP4e-fGqlzwecrNpA0S3J1dTkt2nl7_gO1z5vfQ6DX3-";
const apiUrl =
  "https://api.au-syd.natural-language-understanding.watson.cloud.ibm.com/instances/9e7dfe1f-21dc-4e2f-9b46-b6ae1c28eeba/v1/analyze?version=2019-07-12";

// Endpoint to analyze emotions
app.post("/analyze-emotions", async (req, res) => {
  const { text } = req.body;

  // Validate the input
  if (!text) {
    return res.status(400).json({ error: "Text is required for analysis." });
  }

  // Prepare the request payload for Watson
  const requestData = {
    text,
    features: {
      emotion: {
        document: true, // Perform document-level emotion analysis
      },
    },
  };

  try {
    // Call IBM Watson API
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        "Content-Type": "application/json",
      },
      auth: {
        username: "apikey",
        password: apiKey,
      },
    });

    // Send the emotion analysis result back to the client
    res.status(200).json(response.data);
  } catch (error) {
    // Handle errors from IBM Watson API
    console.error("Error from Watson API:", error.message);
    res.status(500).json({
      error: "Failed to analyze emotions.",
      details: error.response ? error.response.data : error.message,
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
