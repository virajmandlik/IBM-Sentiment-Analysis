const express = require("express");
const axios = require("axios");

const app = express();
const port = 4000;

// Middleware to parse JSON requests
app.use(express.json());

// Route to handle sentiment analysis request
app.post("/get-sentiment", async (req, res) => {
  const { statement } = req.body;

  if (!statement) {
    return res.status(400).send({ error: "No statement provided" });
  }

  try {
    // Sending the request to Flask API
    const response = await axios.post("http://127.0.0.1:6000/analyze_sentiment", {
      statement: statement,
    });

    const sentiment = response.data.sentiment;
    res.send({ sentiment: sentiment });
  } catch (error) {
    console.error("Error sending request to Flask API:", error);
    res.status(500).send({ error: "Failed to analyze sentiment" });
  }
});

app.listen(port, () => {
  console.log(`Node.js server running at http://localhost:${port}`);
});
