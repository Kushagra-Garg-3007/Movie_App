import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AlignJustify } from "lucide-react";
import axios from "axios";
import { setAuthUser } from "../redux/userSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const authUser = useSelector((state) => state.userReducer?.authUser?.user);

  const handleClick = () => {
    axios
      .post("/user/logout", {}, { withCredentials: true })
      .then(() => {
        dispatch(setAuthUser(null));
        navigateTo("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/home" className="text-white text-2xl font-bold">
            MovieX
          </Link>
          <Link className="text-white ml-[50px] text-lg font-bold" to="/lists">
            MovieLists
          </Link>
        </div>

        {/* Links (hidden on small screens) */}
        <div className="hidden md:flex items-center space-x-4">
          {authUser && (
            <span className="text-white">Hi, {authUser.userName}</span>
          )}
          {authUser ? (
            <Link
              to="/createMovieList"
              className="text-white hover:text-white px-3 py-2 rounded transition"
            >
              Create MovieList
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-gray-300 hover:text-white px-3 py-2 rounded transition"
            >
              Login
            </Link>
          )}
          {authUser && (
            <button
              onClick={handleClick}
              className="text-gray-300 hover:text-white px-3 py-2 rounded transition cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 focus:outline-none"
          >
            <AlignJustify className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden mt-4`}>
        <div className="flex flex-col items-start space-y-2">
          {authUser && (
            <span className="text-white">Hi, {authUser.userName}</span>
          )}
          {authUser ? (
            <Link
              to="/createMovieList"
              className="text-gray-300 hover:text-white px-3 py-2 rounded transition"
              onClick={toggleMenu}
            >
              Create MovieList
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-gray-300 hover:text-white px-3 py-2 rounded transition"
              onClick={toggleMenu}
            >
              Login
            </Link>
          )}
          {authUser && (
            <button
              onClick={() => {
                handleClick();
                toggleMenu();
              }}
              className="text-gray-300 hover:text-white px-3 py-2 rounded transition cursor-pointer"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
