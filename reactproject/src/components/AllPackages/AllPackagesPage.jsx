import { useEffect, useState } from "react";
import axios from "axios";
import "./AllPackagesPage.css";
import { Link } from "react-router";

const AllPackagesPage = () => {
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
    <section className="allpackages-section">
      <h2>All Tour Packages</h2>

      <div className="allpackages-container">
        {packages.map((pkg) => (
          <div className="allpackage-card" key={pkg._id}>
            {pkg.images && pkg.images.length > 0 && (
              <img src={pkg.images[0]} alt={pkg.title} />
            )}

            <div className="allpackage-info">
              <h3>{pkg.title}</h3>
              <p>{pkg.description}</p>
              <p>{pkg.maxSeats} Seats Available</p>
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

export default AllPackagesPage;