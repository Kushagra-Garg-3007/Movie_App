import { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useSelector } from "react-redux";
import Home from "./components/Home";
import CreateMovielist from "./components/CreateMovielist";
import Lists from "./components/Lists";

function App() {
  const authUser = useSelector((state) => state.userReducer?.authUser?.user);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/createMovielist" element={<CreateMovielist/>}></Route>
        <Route path="/lists" element={<Lists/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
