import { useEffect, useState } from "react";
import axios from "axios";
import "./BusnewPage.css";
import BusGridNew from "./BusGridNew";

const BusnewPage = () => {
  const [buses, setBuses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/buses");
        setBuses(res.data);
      } catch (error) {
        console.error("Error fetching buses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBuses();
  }, []);

  if (loading) {
    return <div className="fleetsnew-loading">Loading Fleets...</div>;
  }

  return (
    <div className="fleetsnew-page">
      <div className="fleetsnew-header">
        <p>All available buses of our company</p>
      </div>

      <BusGridNew buses={buses} />
    </div>
  );
};

export default BusnewPage;