const express = require("express");
const router = express.Router();
const usersController = require("../../controllers/usersController");

router
  .route("/")
  .get(usersController.getAllUsers)
  .put(usersController.updateUser);

router.route("/:id").get(usersController.getUser);

router
  .route("/:userId/movies/:movieId/sentiment")
  .put(usersController.updateMovieSentiment);

module.exports = router;
