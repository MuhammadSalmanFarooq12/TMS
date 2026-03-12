import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ManagePackageBookings = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/package-bookings"
      );
      setBookings(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch package bookings ❌");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this package booking?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/package-bookings/${id}`
      );
      toast.success("Package booking deleted successfully 🚀");
      fetchBookings();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed ❌");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <h2>Manage Package Bookings</h2>

      <div className="table-wrapper">     
        <table className="admin-table">
          <thead>
            <tr>
              <th>Package</th>
              <th>Passenger Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Seats</th>
              <th>Prices</th>
              <th>Travel Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr key={booking._id}>
                  <td>{booking.package?.title || "N/A"}</td>
                  <td>{booking.passengerName}</td>
                  <td>{booking.email}</td>
                  <td>{booking.phone}</td>
                  <td>{booking.seats}</td>
                  <td>{booking.totalPrice}</td>
                  <td>{booking.travelDate?.slice(0, 10)}</td>
                  <td>{booking.status}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate(
                          `/admin/packagebookings/edit/${booking._id}`
                        )
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
                <td colSpan="7">No package bookings found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>  
    </div>
  );
};

export default ManagePackageBookings;