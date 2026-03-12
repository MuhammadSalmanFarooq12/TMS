import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Packages.css";

const Packages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/packages");
        setPackages(res.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []);

  return (
    <section className="packages-section" id="packages">
      <h1>Our Packages</h1>

      <div className="packages-container">
        {packages.slice(0, 3).map((pkg) => (
          <div className="package-card" key={pkg._id}>
            {pkg.images && pkg.images.length > 0 && (
              <img src={pkg.images[0]} alt={pkg.title} />
            )}

            <div className="package-info">
              <h3>{pkg.title}</h3>
              <p>{pkg.description}</p>
              <p>{pkg.maxSeats} Available</p>
              <p>Price: PKR {pkg.price}</p>

              <Link to={`/packages/${pkg._id}`}>
                <button>Book Now</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Packages;