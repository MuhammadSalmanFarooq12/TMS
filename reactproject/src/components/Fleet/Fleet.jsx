import { useEffect, useState } from "react";
import axios from "axios";
import "./Fleet.css";
import { Link } from "react-router";

const Fleet = () => {
  const [buses, setBuses] = useState([]);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/buses");

        // ✅ limit to first 3
        setBuses(res.data.slice(0, 3));

      } catch (error) {
        console.error("Error fetching buses:", error);
      }
    };

    fetchBuses();
  }, []);

  return (
    <section className="featured-routes" id="fleet">
      <h2>Our Fleet</h2>

      <div className="routes-container">
        {buses.length > 0 ? (
          buses.map((bus) => (
            <div className="route-card" key={bus._id}>

              <div className="route-image">
                <img
                  src={`http://localhost:5000${bus.image}`}
                  alt={bus.name}
                />
              </div>

              <div className="route-info">
                <h3>{bus.name}</h3>

                {/* <p><strong>Number Plate:</strong> {bus.numberPlate}</p>
                <p><strong>Seats:</strong> {bus.seats}</p>
                <p><strong>Route:</strong> {bus.route}</p>
                <p><strong>Departure:</strong> {bus.departureTime}</p>
                <p><strong>Arrival:</strong> {bus.arrivalTime}</p> */}

                <Link to={`/fleet/${bus._id}`}>
                  <button className="view-btn">View Details</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No buses available</p>
        )}
      </div>
    </section>
  );
};

export default Fleet;