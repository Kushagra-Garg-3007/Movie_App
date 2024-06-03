const mongoose = require("mongoose");

const PlaylistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
    },
  ],
  public: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Playlist", PlaylistSchema);
