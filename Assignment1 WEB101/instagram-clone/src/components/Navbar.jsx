import React from "react";
import { FaHome, FaSearch, FaPlusSquare, FaHeart, FaUser } from "react-icons/fa";

const Navbar = () => (
  <nav className="navbar">
    <h1 className="logo">Instagram</h1>
    <div className="nav-icons">
      <FaHome />
      <FaSearch />
      <FaPlusSquare />
      <FaHeart />
      <FaUser />
    </div>
  </nav>
);

export default Navbar;