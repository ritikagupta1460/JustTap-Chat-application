import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "./images/JustTapLogo.png"; // Make sure the logo is placed in 'src/images/'

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <img src={logo} alt="JustTap Logo" className="logo-image" />
        <h1>JustTap</h1>
      </div>

      {/* Navigation Links */}
      <ul className="navbar-links">
        <li>
          <Link to="/homepage" className="navbar-link">
            Home
          </Link>
        </li>
        <li>
          <Link to="/" className="navbar-link">
            Login
          </Link>
        </li>
        <li>
          <Link to="/logout" className="navbar-link">
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
