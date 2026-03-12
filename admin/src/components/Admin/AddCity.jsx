import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddCity = () => {
  const navigate = useNavigate();

  const [city, setCity] = useState({
    name: "",
    province: "",
    country: "Pakistan",
    description: ""
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setCity({ ...city, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", city.name);
    formData.append("province", city.province);
    formData.append("country", city.country);
    formData.append("description", city.description);

    if (image) {
      formData.append("images", image); // ✅ backend field name
    }

    try {
      await axios.post(
        "http://localhost:5000/api/cities",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("City added successfully 🚀");
      navigate("/admin/cities");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add city ❌"
      );
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Add City</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <input
          type="text"
          name="name"
          placeholder="City Name"
          value={city.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="province"
          placeholder="Province"
          value={city.province}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={city.country}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={city.description}
          onChange={handleChange}
          rows="4"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Add City</button>
      </form>
    </div>
  );
};

export default AddCity;