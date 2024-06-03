const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  imdbID: {
    type: String,
    required: true,
    unique: true,
  },
  Title: {
    type: String,
    required: true,
  },
  Year: {
    type: String,
    required: true,
  },
  Type:{
    type:String,
    required:true
  },
  Poster: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Movie", MovieSchema);
