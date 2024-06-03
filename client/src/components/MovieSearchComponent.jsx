import React, { useState } from "react";
import useMovieSearch from "../hooks/useMovieSearch.js";

const MovieSearchComponent = () => {
  const [query, setQuery] = useState("");
  const { movies, loading, error } = useMovieSearch(query);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for a movie..."
        className="border p-2 rounded w-full mb-4 text-black"
      />
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="border p-4 rounded flex flex-col items-center cursor-pointer transform transition duration-500 ease-in-out hover:scale-95 hover:bg-gray-800">
            <img 
              src={movie.Poster} 
              alt={movie.Title} 
              className="w-50 h-auto mb-2" 
            //   style={{ maxWidth: '8rem', maxHeight: '15rem' }}
            />
            <h3 className="text-xl font-bold text-center">{movie.Title}</h3>
            <p className="text-center">{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieSearchComponent;
