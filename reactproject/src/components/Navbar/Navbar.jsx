import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="logo">
          FAST<span>INTERCITY</span>
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/routes">Routes</NavLink></li>
          <li><NavLink to="/cities">Cities</NavLink></li>
          <li><NavLink to="/fleet">Fleet</NavLink></li>
          <li><NavLink to="/packages">Packages</NavLink></li>
          <li><NavLink to="/booking">Booking</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>

        <div className="auth-buttons">
          <NavLink to="/login" className="btn-outline">Login</NavLink>
          <NavLink to="/register" className="btn-primary">Register</NavLink>
        </div>

        <div 
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
