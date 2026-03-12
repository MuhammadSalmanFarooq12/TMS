import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "./RouteSection.css";
import RouteItem from "./RouteItem";
import StickySearchBar from "./StickySearchBar";

const RouteSection = () => {
  const [searchParams] = useSearchParams();
  const [routes, setRoutes] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

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
      setRoutes([]);
      setHasSearched(true);
    }
  };

  useEffect(() => {
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    if (from && to) {
      handleSearch({ from, to });
    } else {
      loadAllRoutes();
    }
  }, [searchParams]);

  return (
    <section className="route-section">
      <StickySearchBar onSearch={handleSearch} />

      <div className="route-status-bar">
        <h2 className="route-title">
          {hasSearched
            ? `Search Results (${routes.length})`
            : "All Available Routes"}
        </h2>
        {hasSearched && (
          <button type="button" onClick={loadAllRoutes} className="route-reset-btn">
            Show All Routes
          </button>
        )}
      </div>

      <div className="route-grid">
        {routes.length > 0 ? (
          routes.map((route) => (
            <RouteItem key={route._id} route={route} />
          ))
        ) : (
          <div className="route-empty-state">
            <h2>Route Not Available Yet</h2>
            <p>We haven&apos;t launched trips for this route. Try another city or show all routes.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default RouteSection;