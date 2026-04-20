import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ALL_FACILITIES = [
  "Breakfasts", "Dinner", "Chairlift ride", "Hi-Tea", "BBQ Night",
  "Bonfire arrangements", "Snow Activities", "Guided trekking",
  "Dedicated transport", "Honeymoon Decor",
];

const AddPackages = () => {
  const navigate = useNavigate();

  const [pkg, setPkg] = useState({
    title: "", description: "", durationDays: "", price: "",
    maxSeats: "", availableSeats: "", hotelIncluded: false,
    mealsIncluded: false, placesToVisit: "",
  });
  const [facilities, setFacilities] = useState([]);
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPkg({ ...pkg, [name]: type === "checkbox" ? checked : value });
  };

  const toggleFacility = (f) => {
    setFacilities((prev) =>
      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(pkg).forEach(([k, v]) => formData.append(k, v));
    formData.append("facilities", JSON.stringify(facilities));
    if (image) formData.append("images", image);

    try {
      await axios.post("http://localhost:5000/api/packages", formData, {
        headers: { "Content-Type": "multipart/form-data" },
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

        <input type="text" name="title" placeholder="Package Title"
          value={pkg.title} onChange={handleChange} required />

        <textarea name="description" placeholder="Description"
          value={pkg.description} onChange={handleChange} required />

        <input type="number" name="durationDays" placeholder="Duration (days)"
          value={pkg.durationDays} onChange={handleChange} required />

        <input type="number" name="price" placeholder="Price (PKR)"
          value={pkg.price} onChange={handleChange} required />

        <input type="number" name="maxSeats" placeholder="Max Seats"
          value={pkg.maxSeats} onChange={handleChange} required />

        <input type="number" name="availableSeats" placeholder="Available Seats"
          value={pkg.availableSeats} onChange={handleChange} required />

        <textarea name="placesToVisit" placeholder="Places to Visit (describe the locations included in this package)"
          value={pkg.placesToVisit} onChange={handleChange} rows={3} />

        {/* Facilities */}
        <p style={{ color: "#e2e8f0", fontWeight: 600, margin: "16px 0 10px" }}>Facilities</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {ALL_FACILITIES.map((f) => (
            <label key={f} style={{ display: "flex", alignItems: "center", gap: 8, color: "#cbd5e1", fontSize: 14, cursor: "pointer" }}>
              <input type="checkbox" checked={facilities.includes(f)} onChange={() => toggleFacility(f)} />
              {f}
            </label>
          ))}
        </div>

        <label style={{ marginTop: 16 }}>
          <input type="checkbox" name="hotelIncluded" checked={pkg.hotelIncluded} onChange={handleChange} />{" "}
          Hotel Included
        </label>

        <label>
          <input type="checkbox" name="mealsIncluded" checked={pkg.mealsIncluded} onChange={handleChange} />{" "}
          Meals Included
        </label>

        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">Add Package</button>
      </form>
    </div>
  );
};

export default AddPackages;
