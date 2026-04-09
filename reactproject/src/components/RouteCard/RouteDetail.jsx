import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import generateTicketPDF from "../../utils/generateTicketPDF";
import "./RouteDetail.css";

const RouteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [route, setRoute] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    passengerName: "",
    email: "",
    phone: "",
    seats: 1,
    travelDate: "",
  });

  /* ================= FETCH ROUTE ================= */

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/routes/${id}`
        );
        setRoute(res.data);
      } catch (error) {
        console.error("Error fetching route:", error);
      }
    };

    fetchRoute();
  }, [id]);

  /* ================= HANDLE INPUT ================= */

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= HANDLE BOOKING ================= */

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/bookings", {
        route: id,
        ...formData,
      });

      generateTicketPDF({
        bookingId: res.data._id,
        passengerName: formData.passengerName,
        email: formData.email,
        phone: formData.phone,
        from: route.from,
        to: route.to,
        distanceKm: route.distanceKm,
        duration: route.duration,
        travelDate: formData.travelDate,
        seats: formData.seats,
        pricePerSeat: route.baseFare,
        totalPrice: formData.seats * route.baseFare,
      }, "route");

      setShowModal(false);
      setFormData({ passengerName: "", email: "", phone: "", seats: 1, travelDate: "" });

    } catch (error) {
      console.error(error);
      alert("Booking Failed ❌");
    }
  };

  if (!route)
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <div className="route-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>&#8592; Back</button>
      <div className="route-detail-container">

        {/* IMAGE */}
       {route.image && (
          <img
            src={route.image}
            alt={`${route.from} to ${route.to}`}
            className="route-detail-image"
          />
        )}
        {/* CONTENT */}
        <div className="route-content">
          <h2>
            {route.from} → {route.to}
          </h2>

          <p><strong>Distance:</strong> {route.distanceKm} km</p>
          <p><strong>Fare:</strong> PKR {route.baseFare}</p>
          <p><strong>Available Seats:</strong> {route.availableSeats}</p>

          <button
            className="book-btn"
            onClick={() => setShowModal(true)}
          >
            Book Now
          </button>
        </div>
      </div>

      {/* ================= BOOKING MODAL ================= */}

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
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                required
                value={formData.phone}
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
                Total Price: PKR {formData.seats * route.baseFare}
              </p>

              <button type="submit">
                Proceed
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteDetail;