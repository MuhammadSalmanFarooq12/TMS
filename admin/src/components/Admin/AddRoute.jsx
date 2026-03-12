import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddRoute = () => {
  const navigate = useNavigate();

  const [route, setRoute] = useState({
    from: "",
    to: "",
    distanceKm: "",
    baseFare: "",
  });

  const [image, setImage] = useState(null); // ✅ added

  const handleChange = (e) => {
    setRoute({ ...route, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(); // ✅ added
    formData.append("from", route.from);
    formData.append("to", route.to);
    formData.append("distanceKm", route.distanceKm);
    formData.append("duration", route.duration);
    formData.append("baseFare", route.baseFare);
    

    if (image) {
      formData.append("image", image); // ✅ added
    }

    try {
      await axios.post(
        "http://localhost:5000/api/routes",
        formData
      );

      toast.success("Route added successfully 🚀");
      navigate("/admin/routes");

    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to add route ❌";

      toast.error(message);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Add New Route</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="from"
          placeholder="From (City)"
          value={route.from}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="to"
          placeholder="To (City)"
          value={route.to}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="distanceKm"
          placeholder="Distance (km)"
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
          placeholder="Base Fare (PKR)"
          value={route.baseFare}
          onChange={handleChange}
          required
        />

        {/* ✅ image field added */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button type="submit">Add Route</button>
      </form>
    </div>
  );
};

export default AddRoute;