// Import required modules
const express = require("express");
const ibm_db = require("ibm_db");
const bodyParser = require("body-parser");
const cors = require("cors");
const apiRoutes = require("./routes/apiRoutes");

// Create an instance of Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database configuration
const dbConfig = {
  database: "bludb", // Your database name
  hostname:
    "3883e7e4-18f5-4afe-be8c-fa31c41761d2.bs2io90l08kqb1od8lcg.databases.appdomain.cloud", // Your hostname
  port: "31498", // Port for Db2 (use 31498 as per your previous details)
  username: "dtc33183", // Your username
  password: "JfwkdTIuO9OfIguH", // Your password
  security: "SSL", // Ensure SSL is enabled
};

// Connect to the Db2 database
ibm_db.open(dbConfig, (err, conn) => {
  if (err) {
    return console.error("Error connecting to the database:", err);
  }
  console.log("Connected to the database successfully");

  // Define a simple route
  app.get("/", (req, res) => {
    res.send("Welcome to the Db2 API!");
  });

  app.use("/api", apiRoutes);

  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // Close the connection when the server is stopped
  process.on("SIGINT", () => {
    conn.close(() => {
      console.log("Database connection closed");
      process.exit(0);
    });
  });
});
