import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import generateTicketPDF from "../../utils/generateTicketPDF";
import "./PackageDetail.css";

const FACILITY_ICONS = {
  "Breakfasts": "🍳",
  "Dinner": "🍽️",
  "Chairlift ride": "🚡",
  "Hi-Tea": "☕",
  "BBQ Night": "🔥",
  "Bonfire arrangements": "🪵",
  "Snow Activities": "❄️",
  "Guided trekking": "🥾",
  "Dedicated transport": "🚌",
  "Honeymoon Decor": "💐",
};

const PackageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pkg, setPkg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    passengerName: "", email: "", phone: "", seats: 1, travelDate: "",
  });

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/packages/${id}`);
        setPkg(res.data);
      } catch (error) {
        console.error("Error fetching package:", error);
      }
    };
    fetchPackage();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/package-bookings", {
        packageId: id,
        passengerName: formData.passengerName,
        email: formData.email,
        phone: formData.phone,
        seats: Number(formData.seats),
        travelDate: formData.travelDate,
        totalPrice: Number(formData.seats) * pkg.price,
        status: "confirmed",
      });

      generateTicketPDF({
        bookingId: res.data._id,
        passengerName: formData.passengerName,
        email: formData.email,
        phone: formData.phone,
        packageTitle: pkg.title,
        description: pkg.description,
        travelDate: formData.travelDate,
        seats: formData.seats,
        pricePerSeat: pkg.price,
        totalPrice: Number(formData.seats) * pkg.price,
      }, "package");

      setShowModal(false);
      setFormData({ passengerName: "", email: "", phone: "", seats: 1, travelDate: "" });
    } catch (error) {
      console.error("Package booking failed:", error.response || error);
      alert("Booking Failed ❌");
    } finally {
      setLoading(false);
    }
  };

  if (!pkg) return <h2 style={{ textAlign: "center", paddingTop: 120 }}>Loading...</h2>;

  const facilities = pkg.facilities || [];

  return (
    <section className="pkg-detail">

      {/* Hero Image */}
      <div className="pkg-hero-wrap">
        {pkg.images && pkg.images.length > 0 && (
          <div className="pkg-hero">
            <img src={pkg.images[0]} alt={pkg.title} className="pkg-hero-img" />
            <div className="pkg-hero-overlay">
              <h1>{pkg.title}</h1>
              <span className="pkg-duration">{pkg.durationDays} Days</span>
            </div>
          </div>
        )}
        <button className="pkg-back-btn" onClick={() => navigate(-1)}>
          &#8592; Back
        </button>
      </div>

      <div className="pkg-body">

        {/* Left column */}
        <div className="pkg-main">

          {!pkg.images?.length && <h2 className="pkg-title-no-img">{pkg.title}</h2>}

          {/* Description */}
          <div className="pkg-section">
            <h3 className="pkg-section-title">About This Package</h3>
            <p className="pkg-desc">{pkg.description}</p>
          </div>

          {/* Facilities */}
          {(facilities.length > 0 || pkg.hotelIncluded || pkg.mealsIncluded) && (
            <div className="pkg-section">
              <h3 className="pkg-section-title">✅ What's Included</h3>
              <div className="pkg-facilities-grid">
                {pkg.hotelIncluded && (
                  <div className="pkg-facility-item" key="hotelIncluded">
                    <span className="pkg-facility-icon">🏨</span>
                    <span>Hotel Included</span>
                  </div>
                )}
                {pkg.mealsIncluded && (
                  <div className="pkg-facility-item" key="mealsIncluded">
                    <span className="pkg-facility-icon">🍽️</span>
                    <span>Meals Included</span>
                  </div>
                )}
                {facilities.map((f) => (
                  <div className="pkg-facility-item" key={f}>
                    <span className="pkg-facility-icon">{FACILITY_ICONS[f] || "✔"}</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Places to Visit */}
          {pkg.placesToVisit && (
            <div className="pkg-section">
              <h3 className="pkg-section-title">🗺️ Places to Visit</h3>
              <div className="pkg-places-box">
                {pkg.placesToVisit
                  .split("\n")
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .map((place, i) => (
                    <div className="pkg-place-item" key={i}>
                      <span className="pkg-place-pin">&#9679;</span>
                      <p className="pkg-place-text">{place}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="pkg-sidebar">
          <div className="pkg-price-card">
            <p className="pkg-price">PKR {pkg.price?.toLocaleString()}</p>
            <p className="pkg-price-label">per person</p>

            <div className="pkg-meta">
              <div className="pkg-meta-item">
                <span>⏱</span><span>{pkg.durationDays} Days</span>
              </div>
              <div className="pkg-meta-item">
                <span>💺</span><span>{pkg.availableSeats} Seats left</span>
              </div>
              {pkg.hotelIncluded && (
                <div className="pkg-meta-item">
                  <span>🏨</span><span>Hotel Included</span>
                </div>
              )}
              {pkg.mealsIncluded && (
                <div className="pkg-meta-item">
                  <span>🍽</span><span>Meals Included</span>
                </div>
              )}
            </div>

            <button className="pkg-book-btn" onClick={() => setShowModal(true)}>
              Book Now
            </button>
          </div>
        </div>

      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="pkg-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="pkg-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pkg-modal-close" onClick={() => setShowModal(false)}>✕</button>
            <h3>Book — {pkg.title}</h3>
            <p className="pkg-modal-sub">PKR {pkg.price?.toLocaleString()} per person</p>

            <form onSubmit={handleBooking}>
              <div className="pkg-modal-row">
                <div className="pkg-modal-field">
                  <label>Full Name</label>
                  <input type="text" name="passengerName" placeholder="Your name"
                    required value={formData.passengerName} onChange={handleChange} />
                </div>
                <div className="pkg-modal-field">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="Email"
                    required value={formData.email} onChange={handleChange} />
                </div>
              </div>
              <div className="pkg-modal-row">
                <div className="pkg-modal-field">
                  <label>Phone</label>
                  <input type="text" name="phone" placeholder="Phone"
                    required value={formData.phone} onChange={handleChange} />
                </div>
                <div className="pkg-modal-field">
                  <label>Seats</label>
                  <input type="number" name="seats" min="1"
                    required value={formData.seats} onChange={handleChange} />
                </div>
              </div>
              <div className="pkg-modal-field" style={{ marginBottom: 14 }}>
                <label>Travel Date</label>
                <input type="date" name="travelDate"
                  required value={formData.travelDate} onChange={handleChange}
                  min={new Date().toISOString().slice(0, 10)} />
              </div>

              <p className="pkg-modal-total">
                {formData.seats} seat(s) × PKR {pkg.price?.toLocaleString()} ={" "}
                <strong>PKR {(formData.seats * pkg.price).toLocaleString()}</strong>
              </p>

              <button type="submit" className="pkg-modal-btn" disabled={loading}>
                {loading ? "Booking..." : "Confirm Booking"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default PackageDetail;
