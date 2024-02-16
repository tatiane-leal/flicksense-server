const User = require("../model/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

const updateUser = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required." });
  }

  const user = await User.findOne({ _id: req.body.id }).exec();
  console.log("was user found?", user);

  if (!user) {
    return res
      .status(204)
      .json({ message: `No user matches ID ${req.body.id}.` });
  }
  if (req.body?.movies) user.movies = req.body.movies;

  const result = await user.save();
  console.log(result);
  res.json(result);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(user);
};

const updateMovieSentiment = async (req, res) => {
  const { userId, movieId } = req.params;
  const { sentiment_result } = req.body;

  if (!userId || !movieId || !sentiment_result) {
    return res
      .status(400)
      .json({ message: "UserID, MovieID, and sentiment_result are required." });
  }

  try {
    const user = await User.findOne({ _id: userId }).exec();

    if (!user) {
      return res.status(204).json({ message: `No user matches ID ${userId}.` });
    }

    // Finds movie by id and updates its sentiment_result
    const movieIndex = user.movies.findIndex(
      (movie) => movie.id === Number(movieId)
    );
    if (movieIndex !== -1) {
      user.movies[movieIndex].sentiment_result = sentiment_result;

      console.log("sentiment saved > result", user);

      await user.save();
      res.json({ user });
    } else {
      res.status(404).json({ message: "Movie not found within user profile." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Error updating movie sentiment",
      error: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  getUser,
  deleteUser,
  updateMovieSentiment,
};
