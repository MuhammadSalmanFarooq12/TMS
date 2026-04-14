import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Cursor from "../../components/Cursor/Cursor";
import "./HotelsPage.css";

const API = "http://localhost:5000/api";
const CITIES = ["Kashmir", "Skardu", "Malam Jabba", "Murree"];

const FacilityIcon = ({ label }) => {
  const icons = { AC: "❄️", WiFi: "📶", "Room Heater": "🔥", "LED TV": "📺" };
  return (
    <span className="hotel-facility-tag">
      {icons[label] || "✔"} {label}
    </span>
  );
};

const BookingModal = ({ hotel, onClose }) => {
  const [form, setForm] = useState({
    guestName: "", email: "", phone: "", checkIn: "", checkOut: "", guests: 1,
  });
  const [loading, setLoading] = useState(false);

  const nights =
    form.checkIn && form.checkOut
      ? Math.max(1, Math.ceil((new Date(form.checkOut) - new Date(form.checkIn)) / 86400000))
      : 0;
  const total = nights * hotel.pricePerNight * form.guests;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === "guests" ? Math.max(1, +value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API}/hotel-bookings`, { hotelId: hotel._id, ...form });
      alert("Booking confirmed! 🎉");
      onClose();
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hotel-modal-overlay" onClick={onClose}>
      <div className="hotel-modal" onClick={(e) => e.stopPropagation()}>
        <button className="hotel-modal-close" onClick={onClose}>✕</button>
        <h3>Book — {hotel.title}</h3>
        <p className="hotel-modal-city">{hotel.city} · PKR {hotel.pricePerNight.toLocaleString()}/night</p>

        <form onSubmit={handleSubmit}>
          <div className="hotel-modal-row">
            <div className="hotel-modal-field">
              <label>Full Name</label>
              <input name="guestName" placeholder="Your name" value={form.guestName} onChange={handleChange} required />
            </div>
            <div className="hotel-modal-field">
              <label>Email</label>
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            </div>
          </div>
          <div className="hotel-modal-row">
            <div className="hotel-modal-field">
              <label>Phone</label>
              <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} required />
            </div>
            <div className="hotel-modal-field">
              <label>Guests</label>
              <input type="number" name="guests" min="1" value={form.guests} onChange={handleChange} required />
            </div>
          </div>
          <div className="hotel-modal-row">
            <div className="hotel-modal-field">
              <label>Check-In</label>
              <input type="date" name="checkIn" value={form.checkIn} onChange={handleChange}
                min={new Date().toISOString().slice(0, 10)} required />
            </div>
            <div className="hotel-modal-field">
              <label>Check-Out</label>
              <input type="date" name="checkOut" value={form.checkOut} onChange={handleChange}
                min={form.checkIn || new Date().toISOString().slice(0, 10)} required />
            </div>
          </div>

          {nights > 0 && (
            <p className="hotel-modal-total">
              {nights} night(s) × {form.guests} guest(s) × PKR {hotel.pricePerNight.toLocaleString()} ={" "}
              <strong>PKR {total.toLocaleString()}</strong>
            </p>
          )}

          <button type="submit" className="hotel-modal-btn" disabled={loading}>
            {loading ? "Booking..." : "Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

const HotelCard = ({ hotel, onBook }) => {
  const facilities = [
    hotel.ac && "AC",
    hotel.wifi && "WiFi",
    hotel.roomHeater && "Room Heater",
    hotel.led && "LED TV",
  ].filter(Boolean);

  return (
    <div className="hotel-card">
      {hotel.image && (
        <div className="hotel-card-img-wrap">
          <img
            src={`http://localhost:5000${hotel.image}`}
            alt={hotel.title}
            className="hotel-card-img"
          />
          <div className="hotel-card-price-badge">
            PKR {hotel.pricePerNight.toLocaleString()}<span>/night</span>
          </div>
        </div>
      )}
      <div className="hotel-card-body">
        <h4 className="hotel-card-title">{hotel.title}</h4>
        <p className="hotel-card-desc">{hotel.description}</p>

        {!hotel.image && (
          <p className="hotel-card-price">
            PKR {hotel.pricePerNight.toLocaleString()} <span>/night</span>
          </p>
        )}

        <div className="hotel-features-section">
          <p className="hotel-section-label">Features</p>
          <div className="hotel-features-grid">
            <span className="hotel-feature-item">🛏 {hotel.rooms} Room{hotel.rooms > 1 ? "s" : ""}</span>
            <span className="hotel-feature-item">🚿 {hotel.bathrooms} Bath</span>
            {hotel.sofas > 0 && <span className="hotel-feature-item">🛋 {hotel.sofas} Sofa{hotel.sofas > 1 ? "s" : ""}</span>}
            {hotel.balconies > 0 && <span className="hotel-feature-item">🏞 {hotel.balconies} Balcon{hotel.balconies > 1 ? "ies" : "y"}</span>}
          </div>
        </div>

        {facilities.length > 0 && (
          <div className="hotel-facilities-section">
            <p className="hotel-section-label">Facilities</p>
            <div className="hotel-facilities-row">
              {facilities.map((f) => <FacilityIcon key={f} label={f} />)}
            </div>
          </div>
        )}

        <button className="hotel-book-btn" onClick={() => onBook(hotel)}>Book Now</button>
      </div>
    </div>
  );
};

const HotelsPage = () => {
  const [hotelsByCity, setHotelsByCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const res = await axios.get(`${API}/hotels`);
        const grouped = {};
        CITIES.forEach((c) => { grouped[c] = []; });
        (res.data || []).forEach((h) => {
          if (grouped[h.city]) grouped[h.city].push(h);
        });
        setHotelsByCity(grouped);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <>
      <Navbar />
      <div className="hotels-page">

        <div className="hotels-hero">
          <h1>Hotels & Stays</h1>
          <p>Find the perfect stay across Pakistan's most beautiful destinations</p>
        </div>

        {loading ? (
          <p className="hotels-loading">Loading hotels...</p>
        ) : (
          CITIES.map((city) => (
            <section key={city} className="hotels-city-section">
              <div className="hotels-city-header">
                <h2>{city}</h2>
                <span>{hotelsByCity[city]?.length || 0} hotel{hotelsByCity[city]?.length !== 1 ? "s" : ""}</span>
              </div>

              {hotelsByCity[city]?.length === 0 ? (
                <p className="hotels-empty">No hotels available for {city} yet.</p>
              ) : (
                <div className="hotels-grid">
                  {hotelsByCity[city].map((hotel) => (
                    <HotelCard key={hotel._id} hotel={hotel} onBook={setSelectedHotel} />
                  ))}
                </div>
              )}
            </section>
          ))
        )}
      </div>

      {selectedHotel && (
        <BookingModal hotel={selectedHotel} onClose={() => setSelectedHotel(null)} />
      )}

      <Footer />
      <Cursor />
    </>
  );
};

export default HotelsPage;
