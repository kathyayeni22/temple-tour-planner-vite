import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <ul className="nav-links">
        <li><NavLink to="/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/top-temples">Top Temples</NavLink></li>
        <li><NavLink to="/plan-tour">Plan Tour</NavLink></li>
        <li><NavLink to="/bookings">My Bookings</NavLink></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;
