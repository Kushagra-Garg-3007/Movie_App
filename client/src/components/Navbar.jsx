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
    <nav className="bg-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="#" className="text-white text-2xl font-bold">
          MovieX
        </Link>

        {/* Links (hidden on small screens) */}
        <div className="hidden md:flex items-center space-x-4">
          {authUser && <span className="text-white">Hi, {authUser.userName}</span>}
          {authUser ? (
            <button
              onClick={handleClick}
              className="text-gray-300 hover:text-white px-3 py-2 rounded cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-gray-300 hover:text-white px-3 py-2 rounded"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 focus:outline-none"
          >
            <AlignJustify />
          </button>
        </div>
      </div>

      {/* Mobile menu (hidden by default) */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden mt-4`}>
        <div className="flex flex-col items-start space-y-2">
          {authUser && <span className="text-white">Hi, {authUser.userName}</span>}
          {authUser ? (
            <button
              onClick={handleClick}
              className="text-gray-300 hover:text-white px-3 py-2 rounded cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-gray-300 hover:text-white px-3 py-2 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
