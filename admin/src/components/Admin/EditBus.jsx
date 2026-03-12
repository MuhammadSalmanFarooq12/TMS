import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditBus = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bus, setBus] = useState({
    name: "",
    numberPlate: "",
    seats: "",
    route: "",
    departureTime: "",
    arrivalTime: "",
    price: "", // ✅ added price field
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/buses/${id}`);
        setBus({
          ...res.data,
          route: res.data.route || "",
          price: res.data.price || "", // ✅ populate price from backend
        });
      } catch (error) {
        toast.error("Failed to load bus data");
      }
    };

    fetchBus();
  }, [id]);

  const handleChange = (e) => {
    setBus({ ...bus, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", bus.name);
    formData.append("numberPlate", bus.numberPlate);
    formData.append("seats", bus.seats);
    formData.append("route", bus.route);
    formData.append("departureTime", bus.departureTime);
    formData.append("arrivalTime", bus.arrivalTime);
    formData.append("price", bus.price); // ✅ include price in request

    if (image) {
      formData.append("image", image);
    }

    try {
      await axios.put(`http://localhost:5000/api/buses/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Bus updated successfully 🚀");
      navigate("/admin/buses");
    } catch (error) {
      console.error(error);
      toast.error("Update failed ❌");
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Edit Bus</h2>

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          value={bus.name}
          onChange={handleChange}
          placeholder="Bus Name"
          required
        />

        <input
          type="text"
          name="numberPlate"
          value={bus.numberPlate}
          onChange={handleChange}
          placeholder="Number Plate"
          required
        />

        <input
          type="number"
          name="seats"
          value={bus.seats}
          onChange={handleChange}
          placeholder="Seats"
          required
        />

        <input
          type="text"
          name="route"
          value={bus.route}
          onChange={handleChange}
          placeholder="Route (Multan - Lahore)"
        />

        <input
          type="time"
          name="departureTime"
          value={bus.departureTime}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="arrivalTime"
          value={bus.arrivalTime}
          onChange={handleChange}
          required
        />

        {/* ✅ Price field */}
        <input
          type="number"
          name="price"
          value={bus.price}
          onChange={handleChange}
          placeholder="Price per seat"
          required
        />

        {/* IMAGE UPLOAD */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button type="submit">Update Bus</button>
      </form>
    </div>
  );
};

export default EditBus;