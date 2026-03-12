import { useEffect, useState } from "react";
import axios from "axios";
import "./RouteSection.css";
import RouteItem from "./RouteItem";
import StickySearchBar from "./StickySearchBar";

const RouteSection = () => {
  const [routes, setRoutes] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    loadAllRoutes();
  }, []);

  const loadAllRoutes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/routes");
      setRoutes(res.data);
      setHasSearched(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async ({ from, to }) => {
    try {
      const res = await axios.get("http://localhost:5000/api/routes", {
        params: { from, to }
      });

      setRoutes(res.data);
      setHasSearched(true);
    } catch (err) {
      console.error("Search failed:", err);
      setRoutes([]); // Clear grid to show "Not Available" message
      setHasSearched(true);
    }
  };

  return (
    <section className="route-section">
      <StickySearchBar onSearch={handleSearch} />

      <div className="status-bar" style={{ display: "flex", justifyContent: "space-between", padding: "20px 0" }}>
        <h2 className="route-title">
          {hasSearched
            ? `Search Results (${routes.length})`
            : "All Available Routes"}
        </h2>

        {hasSearched && (
          <button onClick={loadAllRoutes} style={{ cursor: "pointer", padding: "5px 15px" }}>
            Reset View
          </button>
        )}
      </div>

      <div className="route-grid">
        {routes.length > 0 ? (
          routes.map((route) => (
            <RouteItem key={route._id} route={route} />
          ))
        ) : (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px" }}>
            <h2 style={{ color: "#d9534f" }}>Route Not Available Yet ❌</h2>
            <p>We haven't launched trips for this specific route. Try another city!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RouteSection;