const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const { loginToInstagram ,postToInstagram} = require("./instagram/index");
const CronJob = require("cron").CronJob;
const dotenv = require("dotenv");
const multer = require("multer");
// Enable CORS

// Environment variables for IBM Watson API
const API_KEY = process.env.IBM_WATSON_API_KEY;
const INSTANCE_URL = process.env.IBM_WATSON_URL;

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:5173" })); // Replace with your frontend origin


// Define API key and URL for IBM Watson
const apiKey = "uP4e-fGqlzwecrNpA0S3J1dTkt2nl7_gO1z5vfQ6DX3-";
const apiUrl =
  "https://api.au-syd.natural-language-understanding.watson.cloud.ibm.com/instances/9e7dfe1f-21dc-4e2f-9b46-b6ae1c28eeba/v1/analyze?version=2019-07-12";




const fs = require("fs");
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
// app.post("/api/predict", async (req, res) => {
//   const { feeling, challenge, improve } = req.body;
//   console.log("The data received at backend is:", feeling, challenge, improve);

//   try {
//     const response = await axios.post("http://localhost:5000/predict", {
//       feeling,
//       challenge,
//       improve,
//     });
//     console.log("The data sending from backend is:", response.data);

//     // Forward the entire response from Flask to the frontend
//     res.json(response.data);
//   } catch (error) {
//     console.error("Error calling Flask API:", error.message);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// Route for Wellness Enthusiasts
app.post("/api/predict", async (req, res) => {
  const { feeling, challenge, improve, checkCaption } = req.body;

  // Check if checkCaption is provided
  if (checkCaption) {
    // If checkCaption is provided, use it as the combined statement
    const combinedStatement = checkCaption;

    // Prepare promises for simultaneous API calls
    const sentimentPromise = axios.post("http://127.0.0.1:5000/analyze_sentiment", {
      statement: combinedStatement,
    });

    const emotionPromise = axios.post(
      apiUrl,
      {
        text: combinedStatement,
        features: {
          emotion: { document: true },
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        auth: { username: "apikey", password: apiKey },
      }
    );

    try {
      // Execute both API calls concurrently
      const [sentimentResponse, emotionResponse] = await Promise.all([
        sentimentPromise,
        emotionPromise,
      ]);

      // Extract results from the responses
      const sentiment = sentimentResponse.data.sentiment;
      const emotions = emotionResponse.data.emotion.document.emotion;

      // Combine the results into a single JSON object
      res.json({
        combinedStatement,
        sentiment,
        emotions,
      });
    } catch (error) {
      console.error("Error during analysis:", error.message);
      res.status(500).json({ error: "Failed to process the analysis." });
    }
  } else {
    // If checkCaption is not provided, use feeling, challenge, and improve
    if (!feeling || !challenge || !improve) {
      return res.status(400).json({ error: "All fields (feeling, challenge, improve) are required." });
    }

    // Combine the inputs into one statement
    const combinedStatement = `${feeling}. ${challenge}. ${improve}`;

    // Prepare promises for simultaneous API calls
    const sentimentPromise = axios.post("http://127.0.0.1:5000/analyze_sentiment", {
      statement: combinedStatement,
    });

    const emotionPromise = axios.post(
      apiUrl,
      {
        text: combinedStatement,
        features: {
          emotion: { document: true },
        },
      },
      {
        headers: { "Content-Type": "application/json" },
        auth: { username: "apikey", password: apiKey },
      }
    );

    try {
      // Execute both API calls concurrently
      const [sentimentResponse, emotionResponse] = await Promise.all([
        sentimentPromise,
        emotionPromise,
      ]);

      // Extract results from the responses
      const sentiment = sentimentResponse.data.sentiment;
      const emotions = emotionResponse.data.emotion.document.emotion;

      // Combine the results into a single JSON object
      res.json({
        combinedStatement,
        sentiment,
        emotions,
      });
    } catch (error) {
      console.error("Error during analysis:", error.message);
      res.status(500).json({ error: "Failed to process the analysis." });
    }
  }
});


// // Route for Counselors to process CSV data
// app.post("/api/predictPatientsSentiments", async (req, res) => {
//   const csvData = req.body.csvData;
//   console.log("Received CSV data at backend:", csvData);

//   if (!csvData || csvData.length === 0) {
//     return res.status(400).json({ error: "CSV data is empty or missing." });
//   }

//   const results = [];

//   // Process each row of CSV data
//   for (const row of csvData) {
//     const sentiment = row.Sentiment;
//     const name = row.Name;

//     // Log the name and sentiment before sending to the model
//     console.log(`Processing name: ${name}, sentiment: ${sentiment}`);

//     try {
//       // Send only the sentiment to the model
//       const response = await axios.post("http://localhost:5000/predict", {
//         feeling: sentiment,
//       });

//       const result = {
//         name: name, // Name of the user
//         analyzedSentiment: response.data.overallSentiment, // Analyzed result from the model
//       };

//       // Push the result to the results array
//       results.push(result);

//       // Log the result being sent to the frontend
//       console.log("Result sent to frontend:", result);
//     } catch (error) {
//       console.error(`Error processing ${name}:`, error.message);

//       // Handle errors and include an error status for this entry
//       const errorResult = {
//         name: name,
//         analyzedSentiment: "Error processing sentiment",
//       };

//       results.push(errorResult);

//       // Log the error result being sent to the frontend
//       console.log("Error result sent to frontend:", errorResult);
//     }
//   }

//   // Send the results array to the frontend
//   res.json(results);
// });


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
    const { Name: name, Sentiment: sentimentInput } = row; // Extract `Name` and `Sentiment`

    try {
      // Combine sentiment input into a full analysis statement
      const combinedStatement = `${sentimentInput}`;

      // Concurrently analyze sentiment and emotions
      const sentimentPromise = axios.post("http://127.0.0.1:5000/analyze_sentiment", {
        statement: combinedStatement,
      });

      const emotionPromise = axios.post(
        apiUrl,
        {
          text: combinedStatement,
          features: { emotion: { document: true } },
        },
        {
          headers: { "Content-Type": "application/json" },
          auth: { username: "apikey", password: apiKey },
        }
      );

      const [sentimentResponse, emotionResponse] = await Promise.all([
        sentimentPromise,
        emotionPromise,
      ]);

      const analyzedSentiment = sentimentResponse.data.sentiment;
      const emotions = emotionResponse.data.emotion.document.emotion;

      results.push({
        name,
        combinedStatement,
        analyzedSentiment,
        emotions,
      });

      console.log(`Processed: ${name}`);
    } catch (error) {
      console.error(`Error processing row for ${name}:`, error.message);

      results.push({
        name,
        combinedStatement: sentimentInput,
        analyzedSentiment: "Error processing sentiment",
        emotions: null,
      });
    }
  }

  // Send all results back to the frontend
  res.json(results);
});

// Set up multer for file uploads
const upload = multer({ dest: "uploads/" });


// API endpoint to handle audio file upload and transcription
app.post("/transcribe", upload.single("audio"), async (req, res) => {
  const audioFile = req.file;

  if (!audioFile) {
    return res.status(400).json({ error: "No audio file uploaded" });
  }

  try {
    const audioData = fs.readFileSync(audioFile.path);

    const contentType = audioFile.mimetype; // Dynamically set content type based on file

    const response = await axios.post(
      `${INSTANCE_URL}/v1/recognize`,
      audioData,
      {
        headers: {
          "Content-Type": contentType, // This should match the MIME type of the uploaded file
        },
        auth: {
          username: "apikey",
          password: API_KEY,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(
      "Error transcribing audio:",
      error.response?.data || error.message
    );
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