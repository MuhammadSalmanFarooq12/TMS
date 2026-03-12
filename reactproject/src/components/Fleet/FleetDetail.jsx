// FleetDetail.jsx (frontend)
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./FleetDetail.css";

const FleetDetail = () => {
  const { id } = useParams();
  const [bus, setBus] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    passengerName: "",
    email: "",
    phone: "",         // ✅ added phone
    seats: 1,
    travelDate: "",
  });

  useEffect(() => {
    const fetchBus = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/buses/${id}`);
        setBus(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBus();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/bus-bookings", {
        busId: id,
        passengerName: formData.passengerName,
        email: formData.email,
        phone: formData.phone,     // ✅ send phone
        seats: formData.seats,
        travelDate: formData.travelDate,
      });

      alert("Booking Successful 🎉");
      setShowForm(false);
      setFormData({
        passengerName: "",
        email: "",
        phone: "",
        seats: 1,
        travelDate: "",
      });
    } catch (error) {
      console.error(error.response || error);
      alert("Booking Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!bus) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <section className="fleet-detail">
      <div className="fleet-detail-container">
        <img src={`http://localhost:5000${bus.image}`} alt={bus.name} />

        <div className="fleet-info">
          <h2>{bus.name}</h2>
          <p><strong>Number Plate:</strong> {bus.numberPlate}</p>
          <p><strong>Total Seats:</strong> {bus.seats}</p>
          <p><strong>Route:</strong> {bus.route}</p>
          <p><strong>Departure:</strong> {bus.departureTime}</p>
          <p><strong>Arrival:</strong> {bus.arrivalTime}</p>
          <p><strong>Price per seat:</strong> PKR {bus.price}</p>

          <button className="book-btn" onClick={() => setShowForm(!showForm)}>
            Book Now
          </button>

          {showForm && (
            <form className="booking-form" onSubmit={handleBooking}>
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

              <p style={{ color: "orange", fontWeight: 600 }}>
                Total Price: PKR {formData.seats * (bus.price || 0)}
              </p>

              <button type="submit" disabled={loading}>
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default FleetDetail;