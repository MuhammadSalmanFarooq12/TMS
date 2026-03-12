import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ import toast

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  const fetchPackages = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/packages");
      setPackages(res.data);
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error("Failed to fetch packages ❌"); // ✅ toast for fetch error
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/packages/${id}`);
      toast.success("Package deleted successfully 🚀"); // ✅ success toast
      fetchPackages(); // refresh list
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Delete failed ❌"); // ✅ error toast
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <div>
      <h2>Manage Packages</h2>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Max Seats</th>
              <th>Available Seats</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {packages.length > 0 ? (
              packages.map((pkg) => (
                <tr key={pkg._id}>
                  <td>{pkg.title}</td>
                  <td>{pkg.durationDays} days</td>
                  <td>PKR {pkg.price}</td>
                  <td>{pkg.availableSeats}</td>
                  <td>{pkg.maxSeats}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/admin/packages/edit/${pkg._id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(pkg._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No packages found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>  
    </div>
  );
};

export default ManagePackages;