const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const { loginToInstagram ,postToInstagram} = require("./instagram/index");
const CronJob = require("cron").CronJob;
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());





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

const cronInsta = new CronJob("0 0 * * *", async () => {
  console.log("Starting scheduled Instagram post...");
  await postToInstagram("username", "password"); // Replace with real credentials
});

cronInsta.start();

app.post("/api/instagram/post", async (req, res) => {
  const { username, password, imageUrl, caption } = req.body;
console.log('the data recievd at bakend for posting is ',username, password, imageUrl, caption)
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
    console.log("the error is ",error)
    res.status(500).json({ error: "An error occurred while uploading the post." });
  }
});






// Route for Wellness Enthusiasts
// Route for Sentiment Analysis
app.post("/api/predict", async (req, res) => {
  const { feeling, challenge, improve, checkCaption } = req.body;
  console.log("The data received at backend is:", feeling, challenge, improve, checkCaption);

  // If checkCaption is provided, send it for sentiment analysis and ignore other fields
  if (checkCaption) {
    try {
      console.log('The check caption is ', checkCaption);
      const response = await axios.post("http://localhost:5000/predict", {
        checkCaption: checkCaption,  // Send only checkCaption
      });

      console.log("The data sending from backend is:", response.data);
      res.json(response.data);  // Forward the response from Flask API
    } catch (error) {
      console.error("Error calling Flask API:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    // Otherwise, process the feeling, challenge, and improve fields
    try {
      const response = await axios.post("http://localhost:5000/predict", {
        feeling,
        challenge,
        improve,
      });
      console.log("The data sending from backend is:", response.data);
      res.json(response.data);  // Forward the response from Flask API
    } catch (error) {
      console.error("Error calling Flask API:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
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