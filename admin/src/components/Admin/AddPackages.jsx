import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddPackages = () => {
  const navigate = useNavigate();

  const [pkg, setPkg] = useState({
    title: "",
    description: "",
    durationDays: "",
    price: "",
    maxSeats: "",
    availableSeats: "",
    hotelIncluded: false,
    mealsIncluded: false,
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPkg({
      ...pkg,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", pkg.title);
    formData.append("description", pkg.description);
    formData.append("durationDays", pkg.durationDays);
    formData.append("price", pkg.price);
    formData.append("maxSeats", pkg.maxSeats);
    formData.append("availableSeats", pkg.availableSeats);
    formData.append("hotelIncluded", pkg.hotelIncluded);
    formData.append("mealsIncluded", pkg.mealsIncluded);

    if (image) {
      formData.append("images", image); // assuming single image for now
    }

    try {
      await axios.post("http://localhost:5000/api/packages", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Package added successfully 🚀");
      navigate("/admin/packages");

    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to add package ❌");
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Add New Package</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Package Title"
          value={pkg.title}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={pkg.description}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="durationDays"
          placeholder="Duration (days)"
          value={pkg.durationDays}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price (PKR)"
          value={pkg.price}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="maxSeats"
          placeholder="Max Seats"
          value={pkg.maxSeats}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="availableSeats"
          placeholder="Available Seats"
          value={pkg.availableSeats}
          onChange={handleChange}
          required
        />

        <label>
          <input
            type="checkbox"
            name="hotelIncluded"
            checked={pkg.hotelIncluded}
            onChange={handleChange}
          />{" "}
          Hotel Included
        </label>

        <label>
          <input
            type="checkbox"
            name="mealsIncluded"
            checked={pkg.mealsIncluded}
            onChange={handleChange}
          />{" "}
          Meals Included
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Add Package</button>
      </form>
    </div>
  );
};

export default AddPackages;