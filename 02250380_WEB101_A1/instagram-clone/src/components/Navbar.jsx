import { FaPlusSquare, FaHeart } from "react-icons/fa";

function Navbar() {
  return (
    <div className="navbar">
      <FaPlusSquare className="nav-left" />
      <h2 className="nav-title">Instagram</h2>
      <div className="nav-right">
        <FaHeart />
      </div>
    </div>
  );
}

export default Navbar;