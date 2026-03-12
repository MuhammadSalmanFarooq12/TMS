import { useEffect, useState } from "react";
import axios from "axios";
import "./CitySection.css";
import CityCard from "./CityCard";

const CitySection = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/cities");
        setCities(res.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  return (
    <section className="city-section">
      <p className="city-title">Available Cities</p>
      <div className="city-grid">
        {cities.map((city) => (
          <CityCard key={city._id} city={city} />
        ))}
      </div>
    </section>
  );
};

export default CitySection;
