import { Link } from "react-router";
import "./Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT SECTION */}
        <div className="footer-left">
          <h2 className="logo">FASTINTERCITY</h2>
          <p>
            Our goal is to help tourism operators deliver 
            reliable, efficient, and comfortable travel 
            experiences while improving operational control 
            and real-time coordination.
          </p>

          <h3 className="footer-heading">Payment Methods</h3>
          <div className="payment-icons">
            <span>Visa</span>
            <span>MasterCard</span>
            <span>JazzCash</span>
            <span>Easypaisa</span>
          </div>
        </div>

        {/* USEFUL LINKS */}
        <div className="footer-links">
          <h3>Useful Links</h3>
          <ul>
            <li><Link to="/" end>Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/faqs">FAQs</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div className="footer-links">
          <h3>Services</h3>
          <ul>
            <li>Bus</li>
            <li>Flight</li>
            <li>Hotel</li>
            <li>Car</li>
            <li>Events</li>
            <li>Tours</li>
          </ul>
        </div>

        {/* APP + SOCIAL */}
        <div className="footer-right">
          <h3>Get The App</h3>
          <div className="app-buttons">
            <button className="app-btn">Google Play</button>
            <button className="app-btn">App Store</button>
          </div>

          <h3>Keep In Touch</h3>
          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaLinkedinIn />
            <FaTiktok />
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <p>© 2026 Bookkaru.com | All Rights Reserved</p>
        <div className="footer-bottom-links">
          <span><Link to="/terms">Terms & Conditions</Link></span>
          <span><Link to="/privacy">Privacy Policy</Link></span>
          <span><Link to="/booking-terms">Booking Terms</Link></span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
