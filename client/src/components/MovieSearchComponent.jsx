import React, { useState, useEffect } from "react";
import useMovieSearch from "../hooks/useMovieSearch.js";
import axios from "axios";
import { useSelector } from "react-redux";

const MovieSearchComponent = () => {
  const [query, setQuery] = useState("");
  const { movies, loading, error } = useMovieSearch(query);
  const [showForm, setShowForm] = useState(false);
  const [list, setList] = useState([]);
  const authUser=useSelector(state=>state?.userReducer?.authUser?.user);

  const initialFormData = {
    movie: null,
    playlistName: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleAddToMovieList = async () => {
    console.log(formData);
    await axios
      .post("/user/addToPlaylist", formData, { withCredentials: true })
      .then(() => console.log("form submitted successfully"))
      .catch((err) => console.log("err while adding to playlist", err));
    setFormData(initialFormData);
    setShowForm(false);
  };

  useEffect(() => {
    const getList = async () => {
      try {
        const res = await axios.get("/user/getLists");
        setList(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getList();
  }, []);

  return (
    <div className="relative container mx-auto p-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a movie..."
        className="border p-2 rounded w-full mb-4 text-black"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="border p-4 rounded flex flex-col items-center cursor-pointer transform transition duration-500 ease-in-out hover:scale-95 hover:bg-gray-800"
          >
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-50 h-auto mb-2"
            />
            <h3 className="text-xl font-bold text-center">{movie.Title}</h3>
            <p className="text-center">{movie.Year}</p>
            {authUser && <button
              className="bg-slate-700 mt-2"
              onClick={() => {
                setFormData({ ...formData, movie });
                setShowForm(true);
              }}
            >
              Add To MovieList
            </button>}
          </div>
        ))}
      </div>
      {showForm && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-2xl text-black font-semibold mb-4">
              Add to Playlist
            </h2>
            <select
              name="playlistName"
              value={formData.playlistName}
              onChange={handleChange}
              className="text-black w-full p-3 border"
            >
              <option value="" disabled>
                Select a playlist
              </option>
              {list.map((item) => (
                <option key={item._id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <div className="flex justify-end mt-5">
              <button
                className="bg-[blue] text-white py-2 px-4 rounded"
                onClick={handleAddToMovieList}
              >
                Add to Playlist
              </button>
              <button
                className="ml-2 bg-[red] text-white py-2 px-4 rounded"
                onClick={() => {
                  setShowForm(false);
                  setFormData(initialFormData);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearchComponent;
