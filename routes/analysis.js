const express = require("express");
const router = express.Router();
const analysisController = require("../controllers/analysisController");

router.post("/", analysisController.handleAnalysis);

module.exports = router;
