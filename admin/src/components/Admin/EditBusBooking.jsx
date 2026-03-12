// src/admin/EditBusBooking.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditBusBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    bus: "",
    passengerName: "",
    email: "",
    phone: "",           // ✅ added phone
    seats: 1,
    travelDate: "",
    totalPrice: 0,
    status: "confirmed",
  });

  const [buses, setBuses] = useState([]);

  // Fetch booking details and buses list
  useEffect(() => {
    fetchBooking();
    fetchBuses();
  }, [id]);

  const fetchBooking = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/bus-bookings/${id}`);

      setBooking({
        ...res.data,
        bus: res.data.bus?._id || res.data.bus,
        travelDate: res.data.travelDate?.slice(0, 10),
        phone: res.data.phone || "",  // ✅ set phone
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to load booking");
    }
  };

  const fetchBuses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/buses");
      setBuses(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load buses");
    }
  };

  const handleChange = (e) => {
    setBooking({
      ...booking,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Recalculate total price based on selected bus price and seats
      const busDetails = buses.find((b) => b._id === booking.bus);
      const totalPrice = busDetails ? Number(booking.seats) * busDetails.price : booking.totalPrice;

      await axios.put(`http://localhost:5000/api/bus-bookings/${id}`, {
        ...booking,
        seats: Number(booking.seats),
        totalPrice: totalPrice,
      });

      toast.success("Booking updated successfully");
      navigate("/admin/bus-bookings");
    } catch (err) {
      console.error(err);
      toast.error("Update failed");
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Edit Bus Booking</h2>

      <form onSubmit={handleSubmit}>
        <label>Bus</label>
        <select
          name="bus"
          value={booking.bus}
          onChange={handleChange}
          required
        >
          <option value="">Select Bus</option>
          {buses.map((bus) => (
            <option key={bus._id} value={bus._id}>
              {bus.name} - PKR {bus.price}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="passengerName"
          placeholder="Passenger name"
          value={booking.passengerName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={booking.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone number"
          value={booking.phone}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="seats"
          placeholder="Number of seats"
          value={booking.seats}
          onChange={handleChange}
          min="1"
          required
        />

        <input
          type="date"
          name="travelDate"
          value={booking.travelDate}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="totalPrice"
          placeholder="Total Price"
          value={booking.totalPrice}
          readOnly
        />

        <label>Status</label>
        <select
          name="status"
          value={booking.status}
          onChange={handleChange}
        >
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button type="submit">Update Booking</button>
      </form>
    </div>
  );
};

export default EditBusBooking;