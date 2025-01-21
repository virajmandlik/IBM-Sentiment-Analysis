const express = require("express");
const predictionController = require("../controllers/predictionController");

const router = express.Router();

router.post("/predict", predictionController);

module.exports = router;
