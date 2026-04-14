import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const HotelBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/hotel-bookings");
      setBookings(res.data);
    } catch {
      toast.error("Failed to fetch hotel bookings");
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/hotel-bookings/${id}`);
      toast.success("Booking deleted");
      fetchBookings();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <h2>Hotel Bookings</h2>
      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Guest</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Hotel</th>
              <th>City</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Guests</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.guestName}</td>
                <td>{b.email}</td>
                <td>{b.phone}</td>
                <td>{b.hotelTitle}</td>
                <td>{b.hotelCity}</td>
                <td>{b.checkIn}</td>
                <td>{b.checkOut}</td>
                <td>{b.guests}</td>
                <td>PKR {b.totalPrice?.toLocaleString()}</td>
                <td>
                  <button className="delete-btn" onClick={() => handleDelete(b._id)}>Delete</button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="10">No hotel bookings yet</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HotelBookings;
