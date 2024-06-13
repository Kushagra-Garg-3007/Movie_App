import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

const Lists = () => {
  const [publicList, setPublicList] = useState([]);
  const [privateList, setPrivateList] = useState([]);
  const authUser = useSelector((state) => state?.userReducer?.authUser?.user);
  console.log(authUser);
  useEffect(() => {
    axios
      .get("/user/getPlayList")
      .then((res) => {
        setPublicList(res?.data?.list || []);
        setPrivateList(res?.data?.privateList || []);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Navbar />
      {authUser != null ? (
        <div className="p-6">
          {/* Private List */}
          <div className="mt-4">
            <h2 className="text-2xl text-white font-semibold mb-4">
              Your Lists
            </h2>
            {privateList.map((listItem, index) => (
              <div key={index} className="mb-4 border p-4 rounded-lg">
                <h3 className="text-xl text-white text-center font-medium mb-2">
                  {listItem.name}
                </h3>
                <div className="flex overflow-x-auto space-x-4">
                  {listItem.movies.map((movie, movieIndex) => (
                    <div
                      key={movieIndex}
                      className="flex-shrink-0 w-[200px]  p-2 rounded-lg"
                    >
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-[150px] h-[220px] object-cover mb-2 mx-auto"
                      />
                      <p className="font-semibold text-center">
                        {movie.Title} ({movie.Year})
                      </p>
                      <p className="text-sm text-center">{movie.Type}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {/* Public List */}
          <div>
            <h2 className="text-2xl text-white my-[50px] font-semibold">
              Public Lists
            </h2>
            {publicList.map((listItem, index) => (
              <div key={index} className="mb-4 border p-4 rounded-lg">
                <h3 className="text-xl text-center text-white font-medium mb-2">
                  {listItem.name}
                </h3>
                <div className="flex overflow-x-auto space-x-4">
                  {listItem.movies.map((movie, movieIndex) => (
                    <div
                      key={movieIndex}
                      className="flex-shrink-0 w-[200px] p-2 rounded-lg"
                    >
                      <img
                        src={movie.Poster}
                        alt={movie.Title}
                        className="w-[150px] h-[220px] object-cover mb-2 mx-auto"
                      />
                      <p className="font-semibold text-center">
                        {movie.Title} ({movie.Year})
                      </p>
                      <p className="text-sm text-center">{movie.Type}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="">
          <h1 className="m-[25px] text-center text-white text-2xl">
            Please login to Continue....
          </h1>
        </div>
      )}
    </>
  );
};

export default Lists;
