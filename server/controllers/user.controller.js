const Playlist = require("../models/playlist.model.js");
const Movie = require("../models/movie.model.js");

const createPlaylist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, isPublic } = req.body;
    const verify = await Playlist.findOne({ name });
    if (verify) return res.status(400).json("Playlist already exists");

    const playlist = new Playlist({
      user: userId,
      name,
      public: isPublic,
    });

    await playlist.save();
    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ message: "Error creating playlist", error: err });
  }
};


const addToPlaylist = async (req, res) => {
  try {
    const { playlistName, movie } = req.body;
    if (!playlistName || !movie) {
      return res.status(400).json("All fields are required");
    }

    const list = await Playlist.findOne({ name: playlistName });
    if (!list) return res.status(404).json("Playlist not found");

    if (
      list.public === false &&
      list.user.toString() !== req.user._id.toString()
    ) {
      return res.status(401).json("Creator and user ID mismatch");
    }

    let findMovie = await Movie.findOne({ imdbID: movie.imdbID });
    if (findMovie) {
      if (!list.movies.includes(findMovie._id)) {
        list.movies.push(findMovie._id);
        await list.save();
        return res.status(200).json("Movie added successfully");
      } else {
        return res.status(200).json("Movie already in the playlist");
      }
    }

    const newMovie = new Movie({
      Title: movie.Title,
      Year: movie.Year,
      imdbID: movie.imdbID,
      Type: movie.Type,
      Poster: movie.Poster,
    });
    await newMovie.save();
    list.movies.push(newMovie._id);
    await list.save();
    return res.status(200).json("Movie added successfully");
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding movie to playlist", error: err });
  }
};

const getPlaylist = async (req, res) => {
  const list = await Playlist.find({ public: true }).populate("movies");
  const privateList = await Playlist.find({ user: req?.user?._id }).populate(
    "movies"
  );
  res.status(200).json({ list, privateList });
};

const getLists = async (req, res) => {
  try {
    const publicList = await Playlist.find({ public: true });
    const privateList = await Playlist.find({ user: req?.user?._id, public:false });
    const combinedList = [...publicList, ...privateList];
    res.status(200).json(combinedList);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching playlists', error });
  }
};


module.exports = { createPlaylist, addToPlaylist, getPlaylist, getLists };
