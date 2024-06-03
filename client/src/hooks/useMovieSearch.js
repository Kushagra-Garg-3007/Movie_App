import { useState, useEffect } from "react";
import axios from "axios";

const useMovieSearch=(query)=>{
    const [movies,setMovies]=useState([]);
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(null);

    useEffect(()=>{
        if(!query) {
            setMovies([]);
        };
        const fetchMovies=async ()=>{
            setLoading(true)
            await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=76df14d6`)
            .then((res)=>{
                if(res.data.Response==='True'){
                    setMovies(res.data.Search);
                }
            })
            .catch((err)=>{
                setMovies([]);
                console.log("err while fetching movies");
                setError(err);
            });
            setLoading(false)
        }
        fetchMovies();
    },[query]);
    return {movies,loading,error};
}

export default useMovieSearch;
