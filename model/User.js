const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
  name: String,
  description: String,
  favoriteMovies: [
    {
      title: String,
      year: String,
      rated: String,
      released: String,
      runtime: String,
      genre: String,
      director: String,
      writer: String,
      actors: String,
      plot: String,
      language: String,
      country: String,
      awards: String,
      poster: String,
      ratings: [
        {
          source: String,
          value: String,
        },
      ],
      metascore: String,
      imdbRating: String,
      imdbVotes: String,
      imdbID: String,
      type: String,
      dvd: String,
      boxOffice: String,
      production: String,
      website: String,
      response: String,
    },
  ],
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
