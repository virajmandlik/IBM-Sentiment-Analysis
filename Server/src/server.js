const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const fs = require("fs");
const CronJob = require("cron").CronJob;
const dotenv = require("dotenv");
const path = require("path");
// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173" })); // Replace with your frontend origin

// Environment variables for IBM Watson API
const API_KEY = process.env.IBM_API_KEY;
const INSTANCE_URL = process.env.IBM_URL;

if (!API_KEY || !INSTANCE_URL) {
  throw new Error("IBM API key or URL is not set in the environment variables");
}

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, "../dist")));

// Fallback route to serve index.html for React SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// IBM Watson NLU initialization using Axios
const analyzeSentiment = async (text) => {
  try {
    const response = await axios.post(
      `${INSTANCE_URL}/v1/analyze?version=2019-07-12`,
      {
        text,
        features: {
          sentiment: { document: true },
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        auth: { username: "apikey", password: API_KEY },
      }
    );
    return response.data.sentiment.document.label;
  } catch (error) {
    console.error("Error in Watson Sentiment Analysis:", error.message);
    throw error;
  }
};

// Function to analyze emotions
const analyzeEmotions = async (text) => {
  try {
    const response = await axios.post(
      `${INSTANCE_URL}/v1/analyze?version=2019-07-12`,
      {
        text,
        features: {
          emotion: { document: true },
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        auth: { username: "apikey", password: API_KEY },
      }
    );
    return response.data.emotion.document.emotion;
  } catch (error) {
    console.error("Error in Watson Emotion Analysis:", error.message);
    throw error;
  }
};

// Instagram functions (mock or real implementation)
const { loginToInstagram, postToInstagram } = require("./instagram/index");

// Instagram login endpoint
app.post("/api/instagram/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  const result = await loginToInstagram(username, password);

  if (result.success) {
    res.json({ message: `Logged in as ${result.username}` });
  } else {
    res.status(401).json({ error: result.error });
  }
});

// Cron job for scheduled Instagram posts
const cronInsta = new CronJob("0 0 * * *", async () => {
  console.log("Starting scheduled Instagram post...");
  await postToInstagram("username", "password"); // Replace with real credentials
});

cronInsta.start();

// Instagram post endpoint
app.post("/api/instagram/post", async (req, res) => {
  const { username, password, imageUrl, caption } = req.body;
  console.log("Data received for Instagram post:", { username, password, imageUrl, caption });

  if (!username || !password || !imageUrl || !caption) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const result = await postToInstagram(username, password, imageUrl, caption);
    if (result.success) {
      res.json({ message: "Post uploaded successfully!" });
    } else {
      res.status(500).json({ error: "Failed to upload post." });
    }
  } catch (error) {
    console.error("Error uploading post:", error.message);
    res.status(500).json({ error: "An error occurred while uploading the post." });
  }
});

// Predict sentiment and emotions
app.post("/api/predict", async (req, res) => {
  const { feeling, challenge, improve, checkCaption } = req.body;

  try {
    const combinedStatement = checkCaption || `${feeling}. ${challenge}. ${improve}`;

    // Perform Watson analysis
    const sentiment = await analyzeSentiment(combinedStatement);
    const emotions = await analyzeEmotions(combinedStatement);

    res.json({ combinedStatement, sentiment, emotions });
  } catch (error) {
    console.error("Error in analysis:", error.message);
    res.status(500).json({ error: "Failed to process the analysis." });
  }
});

// Predict sentiments for CSV data
app.post("/api/predictPatientsSentiments", async (req, res) => {
  const csvData = req.body.csvData;

  if (!csvData || csvData.length === 0) {
    return res.status(400).json({ error: "CSV data is empty or missing." });
  }

  const results = [];

  for (const row of csvData) {
    const { Name: name, Sentiment: sentimentInput } = row;

    try {
      const sentiment = await analyzeSentiment(sentimentInput);
      const emotions = await analyzeEmotions(sentimentInput);

      results.push({ name, sentiment, emotions });
    } catch (error) {
      console.error(`Error processing row for ${name}:`, error.message);
      results.push({
        name,
        sentiment: "Error processing sentiment",
        emotions: null,
      });
    }
  }

  res.json(results);
});

// File upload handling (e.g., for audio transcription)
const upload = multer({ dest: "uploads/" });

app.post("/transcribe", upload.single("audio"), async (req, res) => {
  const audioFile = req.file;

  if (!audioFile) {
    return res.status(400).json({ error: "No audio file uploaded" });
  }

  try {
    const audioData = fs.readFileSync(audioFile.path);
    const response = await axios.post(
      `${INSTANCE_URL}/v1/recognize`,
      audioData,
      {
        headers: { "Content-Type": audioFile.mimetype },
        auth: { username: "apikey", password: API_KEY },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error transcribing audio:", error.message);
    res.status(500).json({ error: "Failed to transcribe audio" });
  } finally {
    fs.unlink(audioFile.path, (err) => {
      if (err) console.error("Error cleaning up file:", err);
    });
  }
});

app.listen(3000, () => {
  console.log("Node.js server is running on port 3000");
});
