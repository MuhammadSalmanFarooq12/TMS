import { Link } from "react-router-dom";
import "./CityCard.css";

const CityCard = ({ city }) => {
  if (!city) return null;

  return (
    <div className="city-card">
      <img
        src={city.image}
        alt={city.name}
        className="city-image"
      />

      <div className="city-content">
        <h3>{city.name}</h3>
        <h3>
          {city.province} / {city.country}
        </h3>

        <p>{city.description}</p>

        <Link to={`/cities/${city._id}`} className="city-btn">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CityCard;