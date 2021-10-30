const mongoose = require("mongoose");
const movie = require("../model/Movies");
const book = require("../model/Books");
const serie = require("../model/Series");

const reviewSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  subject: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
});

const review = mongoose.model("review", reviewSchema);

module.exports = review;
