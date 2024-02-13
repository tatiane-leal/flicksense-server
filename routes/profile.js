const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/:id", profileController.handleProfile);

module.exports = router;