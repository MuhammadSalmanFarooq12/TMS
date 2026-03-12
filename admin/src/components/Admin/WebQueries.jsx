import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const WebQueries = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error("Error fetching web queries:", error);
      toast.error("Failed to fetch web queries ❌");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this booking?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      toast.success("Deleted successfully 🚀");
      fetchBookings();
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("Delete failed ❌");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Web Queries</h2>
      <p className="admin-subtitle">Bookings submitted from the website Booking page</p>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Route</th>
              <th>Passenger Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Seats</th>
              <th>Fleet</th>
              <th>Total Price</th>
              <th>Travel Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>
                    {booking.route
                      ? `${booking.route.from} - ${booking.route.to}`
                      : "N/A"}
                  </td>
                  <td>{booking.passengerName}</td>
                  <td>{booking.email}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.seats}</td>
                  <td>{booking.fleet || "—"}</td>
                  <td>PKR {booking.totalPrice}</td>
                  <td>{booking.travelDate?.slice(0, 10)}</td>
                  <td>{booking.status}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/admin/bookings/edit/${booking._id}`)
                      }
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(booking._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No web queries found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WebQueries;
