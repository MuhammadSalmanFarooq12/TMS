// PackageDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./PackageDetail.css";

const PackageDetail = () => {
  const { id } = useParams();
  const [pkg, setPkg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    passengerName: "",
    email: "",
    phone: "",
    seats: 1,
    travelDate: "",
  });

  useEffect(() => {
    const fetchPackageById = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/packages/${id}`
        );
        setPkg(res.data);
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    };

    fetchPackageById();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/package-bookings", {
        packageId: id, // ✅ must match backend
        passengerName: formData.passengerName,
        email: formData.email,
        phone: formData.phone,
        seats: Number(formData.seats),
        travelDate: formData.travelDate,
        totalPrice: Number(formData.seats) * pkg.price,
        status: "confirmed",
      });

      alert("Booking Successful 🎉");
      setShowModal(false);

      setFormData({
        passengerName: "",
        email: "",
        seats: 1,
        travelDate: "",
      });

    } catch (error) {
      console.error("Package booking failed:", error.response || error);
      alert("Booking Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!pkg) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <section className="route-detail">
      <div className="route-detail-container">
        {pkg.images && pkg.images.length > 0 && (
          <img
            src={pkg.images[0]}
            alt={pkg.title}
            className="route-detail-image"
          />
        )}

        <div className="route-content">
          <h2>{pkg.title}</h2>

          <p>
            <strong>Description:</strong> {pkg.description}
          </p>

          <p>
            <strong>Available Seats:</strong> {pkg.maxSeats}
          </p>

          <p>
            <strong>Price:</strong> PKR {pkg.price}
          </p>

          <button
            className="book-btn"
            onClick={() => setShowModal(true)}
          >
            Book Now
          </button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>

            <h3>Book Your Seat</h3>

            <form onSubmit={handleBooking}>
              <input
                type="text"
                name="passengerName"
                placeholder="Your Name"
                required
                value={formData.passengerName}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="text"
                name="phone"
                placeholder="Your Phone"
                required
                value={formData.phone || ""}
                onChange={handleChange}
              />

              <input
                type="number"
                name="seats"
                min="1"
                placeholder="Number of Seats"
                required
                value={formData.seats}
                onChange={handleChange}
              />

              <input
                type="date"
                name="travelDate"
                required
                value={formData.travelDate}
                onChange={handleChange}
              />

              <p style={{ color: "orange", fontWeight: "600" }}>
                Total Price: PKR {formData.seats * pkg.price}
              </p>

              <button type="submit" disabled={loading}>
                {loading ? "Booking..." : "Proceed"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default PackageDetail;