const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  roles: {
    User: {
      type: Number,
      default: 2001,
    },
    Editor: Number,
    Admin: Number,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  movies: [
    {
      adult: { type: Boolean },
      backdrop_path: { type: String },
      genre_ids: { type: [Number] },
      id: { type: Number },
      original_language: { type: String },
      original_title: { type: String },
      overview: { type: String },
      popularity: { type: Number },
      poster_path: { type: String },
      release_date: { type: String },
      title: { type: String },
      video: { type: Boolean },
      vote_average: { type: Number },
      vote_count: { type: Number },
    },
  ],
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
