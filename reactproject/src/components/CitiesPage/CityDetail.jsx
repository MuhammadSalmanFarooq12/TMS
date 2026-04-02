import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./CityDetail.css";

const CityDetail = () => {
  const { id } = useParams();
  const [city, setCity] = useState(null);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/cities/${id}`);
        setCity(res.data);
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    };
    fetchCity();
  }, [id]);

  useEffect(() => {
    if (!city?.name) return;
    const fetchRoutes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/routes?from=${encodeURIComponent(city.name)}`
        );
        setRoutes(res.data);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchRoutes();
  }, [city]);

  if (!city) return <h2 className="city-detail-loading">Loading...</h2>;

  return (
    <section className="city-detail">

      {/* ---- City Hero ---- */}
      <div className="city-detail-hero">
        <img src={city.image} alt={city.name} className="city-detail-image" />
        <div className="city-detail-overlay">
          <h2>{city.name}</h2>
          {city.description && <p>{city.description}</p>}
        </div>
      </div>

      {/* ---- Routes ---- */}
      <div className="city-routes-section">
        <h3>Available Routes from <span>{city.name}</span></h3>

        {routes.length === 0 ? (
          <p className="city-no-routes">No routes available from {city.name}.</p>
        ) : (
          <div className="city-routes-grid">
            {routes.map((route) => (
              <div className="city-route-card" key={route._id}>
                <div className="city-route-top">
                  <span className="city-route-from">{route.from}</span>
                  <span className="city-route-arrow">→</span>
                  <span className="city-route-to">{route.to}</span>
                </div>
                <div className="city-route-details">
                  {route.distanceKm && <p><strong>Distance:</strong> {route.distanceKm} km</p>}
                  {route.duration && <p><strong>Duration:</strong> {route.duration}</p>}
                  {route.baseFare && <p><strong>Fare:</strong> PKR {route.baseFare}</p>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </section>
  );
};

export default CityDetail;
