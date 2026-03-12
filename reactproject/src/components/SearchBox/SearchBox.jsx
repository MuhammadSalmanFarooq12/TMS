import "./SearchBox.css";
import { useState } from "react";

const SearchBox = ({ onSearch }) => {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [travelDate, setTravelDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (!fromCity || !toCity || !travelDate) return;
    onSearch({ fromCity, toCity, travelDate });
  };

  return (
    <form className="search-box" onSubmit={handleSearch}>
      <select value={fromCity} onChange={(e) => setFromCity(e.target.value)}>
        <option value="">Departure</option>
        <option value="Islamabad">Multan</option>
        <option value="Lahore">Lahore</option>
        <option value="Karachi">Karachi</option>
      </select>

      <select value={toCity} onChange={(e) => setToCity(e.target.value)}>
        <option value="">Arrival</option>
        <option value="Islamabad">Islamabad</option>
        <option value="Lahore">Murree</option>
        <option value="Karachi">Skardu</option>
      </select>

      <input
        type="date"
        value={travelDate}
        onChange={(e) => setTravelDate(e.target.value)}
      />

      <button type="submit">Search Buses</button>
    </form>
  );
};

export default SearchBox;
