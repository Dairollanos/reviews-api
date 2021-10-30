const mongoose = require("mongoose");

const serieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  producer: {
    type: String,
    required: true,
  },
  seasons: {
    type: String,
    required: true,
  },
});

const serie = mongoose.model("serie", serieSchema);

module.exports = serie;
