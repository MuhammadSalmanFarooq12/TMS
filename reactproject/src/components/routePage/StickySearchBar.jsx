import { useState, useEffect } from "react";
import axios from "axios";
import "./StickySearchBar.css";

const StickySearchBar = ({ onSearch }) => {
  const [fromCities, setFromCities] = useState([]);
  const [toCities, setToCities] = useState([]);
  const [searchData, setSearchData] = useState({ from: "", to: "" });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/routes");
        const allRoutes = res.data;
        
        // Extract unique cities for the dropdowns
        const uniqueFrom = [...new Set(allRoutes.map((r) => r.from))];
        const uniqueTo = [...new Set(allRoutes.map((r) => r.to))];
        
        setFromCities(uniqueFrom);
        setToCities(uniqueTo);
      } catch (err) {
        console.error("Error fetching cities for searchbar", err);
      }
    };
    fetchCities();
  }, []);

  const handleChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchData.from && searchData.to) {
      onSearch(searchData);
    }
  };

  return (
    <div className="sticky-search-container">
      <form className="search-bar-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="route-from">Departure</label>
          <select
            id="route-from"
            name="from"
            value={searchData.from}
            onChange={handleChange}
            required
            aria-label="Select departure city"
          >
            <option value="">Select city</option>
            {fromCities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="input-group">
          <label htmlFor="route-to">Destination</label>
          <select
            id="route-to"
            name="to"
            value={searchData.to}
            onChange={handleChange}
            required
            aria-label="Select destination city"
          >
            <option value="">Select city</option>
            {toCities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="search-btn">
          Search Routes
        </button>
      </form>
    </div>
  );
};

export default StickySearchBar;