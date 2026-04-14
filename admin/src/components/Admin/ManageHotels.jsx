import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CITIES = ["Kashmir", "Skardu", "Malam Jabba", "Murree"];

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [activeCity, setActiveCity] = useState("All");
  const navigate = useNavigate();

  const fetchHotels = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/hotels");
      setHotels(res.data);
    } catch {
      toast.error("Failed to fetch hotels");
    }
  };

  useEffect(() => { fetchHotels(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hotel?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/hotels/${id}`);
      toast.success("Hotel deleted");
      fetchHotels();
    } catch {
      toast.error("Delete failed");
    }
  };

  const filtered = activeCity === "All" ? hotels : hotels.filter((h) => h.city === activeCity);

  return (
    <div>
      <h2>Manage Hotels</h2>

      <div style={{ display: "flex", gap: 8, margin: "16px 0", flexWrap: "wrap" }}>
        {["All", ...CITIES].map((city) => (
          <button
            key={city}
            onClick={() => setActiveCity(city)}
            style={{
              padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer",
              fontWeight: 600, fontSize: 13,
              background: activeCity === city ? "#1ec0ff" : "rgba(255,255,255,0.1)",
              color: activeCity === city ? "#000" : "#ccc",
            }}
          >
            {city}
          </button>
        ))}
      </div>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>City</th>
              <th>Price/Night</th>
              <th>Rooms</th>
              <th>Facilities</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? filtered.map((h) => (
              <tr key={h._id}>
                <td>{h.title}</td>
                <td>{h.city}</td>
                <td>PKR {h.pricePerNight}</td>
                <td>{h.rooms}</td>
                <td>
                  {[h.ac && "AC", h.wifi && "WiFi", h.roomHeater && "Heater", h.led && "LED"]
                    .filter(Boolean).join(", ") || "—"}
                </td>
                <td>
                  <button className="edit-btn" onClick={() => navigate(`/admin/hotels/edit/${h._id}`)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDelete(h._id)}>Delete</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6">No hotels found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageHotels;
