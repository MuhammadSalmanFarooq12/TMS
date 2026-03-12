import { useEffect, useState } from "react";
import axios from "axios";
import "./FeaturedRoutes.css";
import { Link } from "react-router";
const FeaturedRoutes = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/routes");

        // Fetch only first 3 routes
        setRoutes(res.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };

    fetchRoutes();
  }, []);

  return (
    <section className="featured-routes" id="routes">
      <h2>Top Routes</h2>

      <div className="routes-container">
        {routes.map((route) => (
          <div className="route-card" key={route._id}>
            {/* Show uploaded image */}
            <img
              src={route.image} // use the image URL from backend
              alt={`${route.from} to ${route.to}`}
              className="route-image"
            />

            <div className="route-info">
              <h3>
                {route.from} → {route.to}
              </h3>

              <p>Duration: {route.duration}</p>
              <p>Distance: {route.distanceKm} km</p>
              <p>Price: PKR {route.baseFare}</p>

              <Link to={`/bus/${route._id}`}>
               <button>View Details</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedRoutes;
