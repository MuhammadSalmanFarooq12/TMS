import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManageRoutes = () => {
  const [routes, setRoutes] = useState([]);
  const navigate = useNavigate();

  const fetchRoutes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/routes");
      setRoutes(res.data);
    } catch (error) {
      toast.error("Error fetching routes");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this route?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/routes/${id}`);
      toast.success("Route deleted successfully 🚀");
      fetchRoutes();
    } catch (error) {
      toast.error("Delete failed ❌");
    }
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  return (
    <div>
      <h2>Manage Routes</h2>

      {/* ✅ Wrap table for horizontal scrolling */}
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Distance</th>
              <th>Duration</th>
              <th>Fare</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {routes.length > 0 ? (
              routes.map((route) => (
                <tr key={route._id}>
                  <td>{route.from}</td>
                  <td>{route.to}</td>
                  <td>{route.distanceKm} km</td>
                  <td>{route.duration} </td>
                  <td>PKR {route.baseFare}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/admin/routes/edit/${route._id}`)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(route._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No routes found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRoutes;