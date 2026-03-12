import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddBus = () => {
  const navigate = useNavigate();
  const [bus, setBus] = useState({
    name: "",
    numberPlate: "",
    seats: "",
    phone: "",
    price: "",
    route: "",
    departureTime: "",
    arrivalTime: "",
  });

  const handleChange = (e) => {
    setBus({ ...bus, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/buses", bus);
      toast.success("Bus added successfully 🚀");
      navigate("/admin/buses");
    } catch (error) {
      console.error(error);
      toast.error("Add bus failed ❌");
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Add New Bus</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Bus Name"
          value={bus.name}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="numberPlate"
          placeholder="Number Plate"
          value={bus.numberPlate}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="seats"
          placeholder="Total Seats"
          value={bus.seats}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={bus.phone}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price per Seat"
          value={bus.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="route"
          placeholder="Route (From - To)"
          value={bus.route}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="departureTime"
          placeholder="Departure Time"
          value={bus.departureTime}
          onChange={handleChange}
          required
        />

        <input
          type="time"
          name="arrivalTime"
          placeholder="Arrival Time"
          value={bus.arrivalTime}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Bus</button>
      </form>
    </div>
  );
};

export default AddBus;