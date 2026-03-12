import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    route: "",
    passengerName: "",
    email: "",
    phone: "",
    seats: "",
    travelDate: "",
    status: "confirmed",
    fleet: "",
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/bookings/${id}`);

        // assuming booking.route is populated with the route object
        const routeName = res.data.route
          ? `${res.data.route.from} - ${res.data.route.to}`
          : "";

        setBooking({
          ...res.data,
          route: routeName,
          phone: res.data.phone || "",
          travelDate: res.data.travelDate?.slice(0, 10),
          fleet: res.data.fleet || "",
        });
      } catch (error) {
        toast.error("Failed to fetch booking ❌");
      }
    };

    fetchBooking();
  }, [id]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // send only editable fields
      await axios.put(`http://localhost:5000/api/bookings/${id}`, {
        passengerName: booking.passengerName,
        email: booking.email,
        phone: booking.phone,
        seats: booking.seats,
        travelDate: booking.travelDate,
        status: booking.status,
        fleet: booking.fleet,
      });

      toast.success("Booking updated successfully 🚀");
      navigate("/admin/bookings");
    } catch (error) {
      toast.error("Failed to update booking ❌");
      console.error(error.response?.data);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Edit Booking</h2>

      <form onSubmit={handleSubmit}>
        <label>Route</label>
        {/* readonly input instead of dropdown */}
        <input
          type="text"
          name="route"
          value={booking.route}
          readOnly
        />

        <input
          type="text"
          name="passengerName"
          placeholder="Passenger Name"
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
          placeholder="Phone Number"
          value={booking.phone}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="seats"
          placeholder="Seats"
          value={booking.seats}
          onChange={handleChange}
          required
        />

        <label>Fleet</label>
        <input
          type="text"
          name="fleet"
          placeholder="Fleet (e.g. Mercedes, Scania)"
          value={booking.fleet}
          onChange={handleChange}
        />

        <input
          type="date"
          name="travelDate"
          value={booking.travelDate}
          onChange={handleChange}
          required
        />

        <select
          name="status"
          value={booking.status}
          onChange={handleChange}
          required
        >
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <button type="submit">Update Booking</button>
      </form>
    </div>
  );
};

export default EditBooking;