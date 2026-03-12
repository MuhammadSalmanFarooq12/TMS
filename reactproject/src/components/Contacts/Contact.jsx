import { useState } from "react";
import axios from "axios";
import "./Contact.css";

const Contact = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/contact", formData);
      alert("Message sent successfully");

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Failed to send message");
    }
  };

  return (
    <section className="contact-section">
      <div className="contact-container">
        {/* Left Column: App Download */}
        <div className="contact-left">
          <h2>Get Our App</h2>
          <p>
            Book tickets easily with our mobile app, available on Android and iOS.
          </p>
          <div className="app-buttons">
            <button className="playstore">Download on Play Store</button>
            <button className="appstore">Download on App Store</button>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="contact-right">
          <h2>Contact Us</h2>

          {/* ONLY change here: onSubmit + values + names */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Send Message</button>
          </form>

          <div className="social-links">
            <a href="#" target="_blank" rel="noreferrer">Facebook</a>
            <a href="#" target="_blank" rel="noreferrer">Instagram</a>
            <a href="#" target="_blank" rel="noreferrer">Twitter</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;