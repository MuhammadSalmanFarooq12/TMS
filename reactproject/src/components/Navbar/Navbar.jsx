import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <div className="logo">
          TRAVEL<span>KARU</span>
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/routes">Routes</NavLink></li>
          <li><NavLink to="/cities">Cities</NavLink></li>
          <li><NavLink to="/fleet">Fleet</NavLink></li>
          <li><NavLink to="/packages">Packages</NavLink></li>
          <li><NavLink to="/booking">Booking</NavLink></li>
          <li><NavLink to="/hotels">Hotels</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
        </ul>

        <div className="auth-buttons">
          {user ? (
            <>
              <NavLink to="/dashboard" className="btn-outline">👤 {user.name.split(" ")[0]}</NavLink>
              <button className="btn-primary btn-logout" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn-outline">Login</NavLink>
              <NavLink to="/register" className="btn-primary">Register</NavLink>
            </>
          )}
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
