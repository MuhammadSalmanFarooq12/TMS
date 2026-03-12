import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManageCities = () => {
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  const fetchCities = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/cities");
      setCities(res.data);
    } catch (error) {
      toast.error("Failed to fetch cities");
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to delete this city?");
    if (!ok) return;

    try {
      await axios.delete(`http://localhost:5000/api/cities/${id}`);
      toast.success("City deleted successfully 🚀");
      fetchCities();
    } catch (error) {
      toast.error("Delete failed ❌");
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return (
    <div>
      <h2>Manage Cities</h2>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Province</th>
              <th>Country</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {cities.length > 0 ? (
              cities.map((city) => (
                <tr key={city._id}>
                  <td>
                    {city.image && (
                      <img
                        src={city.image}
                        alt={city.name}
                        style={{
                          width: 50,
                          height: 40,
                          objectFit: "cover",
                          borderRadius: 6,
                        }}
                      />
                    )}
                  </td>
                  <td>{city.name}</td>
                  <td>{city.province}</td>
                  <td>{city.country}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/admin/cities/edit/${city._id}`)
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(city._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No cities found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCities;