const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  cast: {
    type: String,
    required: false,
  },
});

const movie = mongoose.model("movie", movieSchema);

module.exports = movie;
