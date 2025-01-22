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

app.listen(3000, () => {
    console.log("Node.js server is running on port 3000");
});
