import "./RouteItem.css";
import { Link } from "react-router";


const RouteItem = ({ route }) => {
  if (!route) return null;

  return (
    <div className="route-item">
      
      {/* Image from backend */}
      {/* <img
        src={route.image}
        alt={`${route.from} to ${route.to}`}
        className="route-image"
      /> */}

      <h3 className="route-heading">
        {route.from} → {route.to}
      </h3>

      <div className="route-times">
        <div>
          <span>Duration</span>
          <p>{route.duration}</p>
        </div>

        <div>
          <span>Distance</span>
          <p>{route.distanceKm} km</p>
        </div>
      </div>

      <div className="route-bottom">
        <h4 className="route-price">PKR {route.baseFare}</h4>
        <Link to={`/bus/${route._id}`}>
        <button className="route-btn">Book Now</button>
        </Link>
      </div>
    </div>
  );
};

export default RouteItem;
