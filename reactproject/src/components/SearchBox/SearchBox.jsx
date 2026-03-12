import "./SearchBox.css";
import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

const SearchBox = ({ onSearch }) => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [cities, setCities] = useState({ from: [], to: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get(`${API_BASE}/routes`);
        const routes = res.data || [];
        const fromSet = [...new Set(routes.map((r) => r.from).filter(Boolean))].sort();
        const toSet = [...new Set(routes.map((r) => r.to).filter(Boolean))].sort();
        setCities({ from: fromSet, to: toSet });
      } catch (err) {
        console.error("Error fetching routes for search", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCities();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fromCity || !toCity) {
      return;
    }
    onSearch({
      from: fromCity,
      to: toCity,
      date: travelDate || undefined,
    });
  };

  const today = new Date().toISOString().slice(0, 10);

  if (loading) {
    return (
      <div className="search-box search-box-loading">Loading...</div>
    );
  }

  return (
    <form className="search-box" onSubmit={handleSubmit}>
      <div className="search-box-field">
        <label htmlFor="hero-from">Departure</label>
        <select
          id="hero-from"
          value={fromCity}
          onChange={(e) => setFromCity(e.target.value)}
          required
        >
          <option value="">Select city</option>
          {cities.from.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="search-box-field">
        <label htmlFor="hero-to">Arrival</label>
        <select
          id="hero-to"
          value={toCity}
          onChange={(e) => setToCity(e.target.value)}
          required
        >
          <option value="">Select city</option>
          {cities.to.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="search-box-field">
        <label htmlFor="hero-date">Date</label>
        <input
          id="hero-date"
          type="date"
          value={travelDate}
          onChange={(e) => setTravelDate(e.target.value)}
          min={today}
        />
      </div>

      <button type="submit" className="search-box-btn">Search Buses</button>
    </form>
  );
};

export default SearchBox;
