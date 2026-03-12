import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManageBuses = () => {
  const [buses, setBuses] = useState([]);
  const navigate = useNavigate();

  const fetchBuses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/buses");
      setBuses(res.data);
    } catch (error) {
      toast.error("Failed to fetch buses");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this bus?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/buses/${id}`);
      toast.success("Bus deleted successfully 🚀");
      fetchBuses();
    } catch (error) {
      toast.error("Delete failed ❌");
    }
  };

  useEffect(() => {
    fetchBuses();
  }, []);

  return (
    <div>
      <h2>Manage Buses</h2>

      {/* Wrap table for horizontal scroll */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Number Plate</th>
              <th>Seats</th>
              <th>Route</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {buses.length > 0 ? (
              buses.map((bus) => (
                <tr key={bus._id}>
                  <td>{bus.name}</td>
                  <td>{bus.numberPlate}</td>
                  <td>{bus.seats}</td>
                  <td>{bus.route}</td>
                  <td>{bus.departureTime}</td>
                  <td>{bus.arrivalTime}</td>
                  <td>{bus.price ? `PKR ${bus.price}` : "-"}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/admin/buses/edit/${bus._id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(bus._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No buses found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBuses;