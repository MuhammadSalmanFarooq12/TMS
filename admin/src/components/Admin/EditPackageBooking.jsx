import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EditPackageBooking = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    package: "",
    passengerName: "",
    email: "",
    phone: "",
    seats: "",
    travelDate: "",
    status: "confirmed",
  });

  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/package-bookings/${id}`
        );

        setBooking({
          ...res.data,
          package: res.data.package?._id || res.data.package,
          travelDate: res.data.travelDate?.slice(0, 10),
        });
      } catch (error) {
        toast.error("Failed to fetch package booking ❌");
      }
    };

        const fetchPackages = async () => {
        try {
            const res = await axios.get(
            "http://localhost:5000/api/tour-packages"
            );
            setPackages(res.data);
        } catch (error) {
            toast.error("Failed to fetch packages ❌");
        }
        };

    fetchBooking();
    fetchPackages();
  }, [id]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/package-bookings/${id}`,
        booking
      );

      toast.success("Package booking updated successfully 🚀");
     navigate("/admin/packagebookings");
    } catch (error) {
      toast.error("Failed to update package booking ❌");
      console.error(error.response?.data);
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Edit Package Booking</h2>

      <form onSubmit={handleSubmit}>
        <label>Package</label>
        <select
          name="package"
          value={booking.package}
          onChange={handleChange}
          
        >
          <option value="">Select Package</option>
          {packages.map((p) => (
            <option key={p._id} value={p._id}>
              {p.title}
            </option>
          ))}
        </select>

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
          placeholder="Phone"
          value={booking.phone || ""}
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

export default EditPackageBooking;