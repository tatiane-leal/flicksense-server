const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");

router.post("/", postController.handlePost);

module.exports = router;