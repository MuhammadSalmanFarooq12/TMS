import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [route, setRoute] = useState({
    from: "",
    to: "",
    distanceKm: "",
    duration: "",
    baseFare: "",
  });

  // Fetch route by ID
  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/routes/${id}`
        );
        setRoute(res.data);
      } catch (error) {
        toast.error("Failed to load route");
      }
    };

    fetchRoute();
  }, [id]);

  const handleChange = (e) => {
    setRoute({ ...route, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/routes/${id}`,
        route
      );

      toast.success("Route updated successfully 🚀");
      navigate("/admin/routes");

    } catch (error) {
      toast.error("Update failed ❌");
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Edit Route</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="from"
          value={route.from}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="to"
          value={route.to}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="distanceKm"
          value={route.distanceKm}
          onChange={handleChange}
          required
        />
        <input
            type="text"
            name="duration"
            placeholder="Duration (e.g. 5h 30m)"
            value={route.duration}
            onChange={handleChange}
            required
        />

        <input
          type="number"
          name="baseFare"
          value={route.baseFare}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Route</button>
      </form>
    </div>
  );
};

export default EditRoute;