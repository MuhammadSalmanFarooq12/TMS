import { useState, useEffect } from "react";
import axios from "axios";
import "./StickySearchBar.css";

const StickySearchBar = ({ onSearch }) => {
  const [allCities, setAllCities] = useState([]);
  const [searchData, setSearchData] = useState({ from: "", to: "" });

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/routes");
        const routes = res.data;
        const all = [...new Set([
          ...routes.map((r) => r.from),
          ...routes.map((r) => r.to),
        ].filter(Boolean))].sort();
        setAllCities(all);
      } catch (err) {
        console.error("Error fetching cities for searchbar", err);
      }
    };
    fetchCities();
  }, []);

  const handleSwap = () => {
    setSearchData((prev) => ({ from: prev.to, to: prev.from }));
  };

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
          >
            <option value="">Select city</option>
            {allCities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <button type="button" className="swap-btn" onClick={handleSwap} title="Swap cities">
          ⇄
        </button>

        <div className="input-group">
          <label htmlFor="route-to">Destination</label>
          <select
            id="route-to"
            name="to"
            value={searchData.to}
            onChange={handleChange}
            required
          >
            <option value="">Select city</option>
            {allCities.map((city) => (
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