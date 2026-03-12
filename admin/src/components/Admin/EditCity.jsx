import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditCity = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [city, setCity] = useState({
    name: "",
    province: "",
    country: "",
    description: ""
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchCity = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cities/${id}`
        );

        setCity({
          name: res.data.name,
          province: res.data.province,
          country: res.data.country,
          description: res.data.description || ""
        });
      } catch (error) {
        toast.error("Failed to load city");
      }
    };

    fetchCity();
  }, [id]);

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
      formData.append("images", image); // ✅ same field
    }

    try {
      await axios.put(
        `http://localhost:5000/api/cities/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("City updated successfully 🚀");
      navigate("/admin/cities");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed ❌"
      );
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Edit City</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <input
          type="text"
          name="name"
          value={city.name}
          onChange={handleChange}
          placeholder="City Name"
          required
        />

        <input
          type="text"
          name="province"
          value={city.province}
          onChange={handleChange}
          placeholder="Province"
          required
        />

        <input
          type="text"
          name="country"
          value={city.country}
          onChange={handleChange}
          placeholder="Country"
        />

        <textarea
          name="description"
          value={city.description}
          onChange={handleChange}
          placeholder="Description"
          rows="4"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Update City</button>
      </form>
    </div>
  );
};

export default EditCity;