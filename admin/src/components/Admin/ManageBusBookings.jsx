import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManageBusBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bus-bookings");
      setBookings(res.data);
    } catch {
      toast.error("Failed to fetch bus bookings ❌");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/bus-bookings/${id}`);
      toast.success("Booking deleted successfully 🚀");
      fetchBookings();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  return (
    <div>
      <h2>Fleet Bookings</h2>
      <p className="admin-subtitle">Bookings made from the Fleet / Bus detail page</p>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Bus / Fleet</th>
              <th>Passenger Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Seats</th>
              <th>Travel Date</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking, i) => (
                <tr key={booking._id}>
                  <td>{i + 1}</td>
                  <td>{booking.bus ? booking.bus.name : "—"}</td>
                  <td>{booking.passengerName}</td>
                  <td>{booking.email}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.seats}</td>
                  <td>{booking.travelDate?.slice(0, 10)}</td>
                  <td>PKR {booking.totalPrice?.toLocaleString()}</td>
                  <td>{booking.status}</td>
                  <td>
                    <button className="edit-btn" onClick={() => navigate(`/admin/bus-bookings/edit/${booking._id}`)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(booking._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" style={{ textAlign: "center", padding: 20 }}>No fleet bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBusBookings;
