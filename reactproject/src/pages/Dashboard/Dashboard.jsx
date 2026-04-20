import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Dashboard.css";

const statusColor = { confirmed: "#4ade80", pending: "#facc15", cancelled: "#f87171" };

const Dashboard = () => {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [hotelBookings, setHotelBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("routes");

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    axios
      .get("http://localhost:5000/api/users/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setBookings(res.data.bookings || []);
        setHotelBookings(res.data.hotelBookings || []);
      })
      .catch(() => { setBookings([]); setHotelBookings([]); })
      .finally(() => setLoading(false));
  }, [user, token, navigate]);

  const handleLogout = () => { logout(); navigate("/"); };

  return (
    <>
      <Navbar />
      <div className="dashboard-page">

        {/* Profile Card */}
        <div className="dashboard-profile">
          <div className="profile-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          <div className="profile-info">
            <h2>{user?.name}</h2>
            <p>{user?.email}</p>
            <p>{user?.phone}</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        {/* Tabs */}
        <div className="dashboard-section">
          <div className="dash-tabs">
            <button
              className={`dash-tab ${activeTab === "routes" ? "active" : ""}`}
              onClick={() => setActiveTab("routes")}
            >
              🎟️ Route Bookings
              {bookings.length > 0 && <span className="dash-tab-count">{bookings.length}</span>}
            </button>
            <button
              className={`dash-tab ${activeTab === "hotels" ? "active" : ""}`}
              onClick={() => setActiveTab("hotels")}
            >
              🏨 Hotel Bookings
              {hotelBookings.length > 0 && <span className="dash-tab-count">{hotelBookings.length}</span>}
            </button>
          </div>

          {loading ? (
            <p className="dash-loading">Loading bookings...</p>
          ) : activeTab === "routes" ? (
            bookings.length === 0 ? (
              <div className="no-bookings">
                <p>No route bookings found.</p>
                <button onClick={() => navigate("/routes")}>Browse Routes</button>
              </div>
            ) : (
              <div className="bookings-grid">
                {bookings.map((b) => (
                  <div key={b._id} className="booking-card">
                    <div className="booking-card-type">🎟️ Route</div>
                    <div className="booking-route">
                      <span>{b.route?.from || "—"}</span>
                      <span className="arrow">→</span>
                      <span>{b.route?.to || "—"}</span>
                    </div>
                    <div className="booking-details">
                      <div className="booking-row">
                        <span>Travel Date</span>
                        <span>{new Date(b.travelDate).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                      <div className="booking-row">
                        <span>Seats</span>
                        <span>{b.seats}</span>
                      </div>
                      <div className="booking-row">
                        <span>Total</span>
                        <span>PKR {b.totalPrice?.toLocaleString()}</span>
                      </div>
                      <div className="booking-row">
                        <span>Booked On</span>
                        <span>{new Date(b.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                    </div>
                    <div className="booking-status" style={{ color: statusColor[b.status] || "#aaa" }}>
                      ● {b.status}
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            hotelBookings.length === 0 ? (
              <div className="no-bookings">
                <p>No hotel bookings found.</p>
                <button onClick={() => navigate("/hotels")}>Browse Hotels</button>
              </div>
            ) : (
              <div className="bookings-grid">
                {hotelBookings.map((b) => (
                  <div key={b._id} className="booking-card">
                    <div className="booking-card-type">🏨 Hotel</div>
                    <div className="booking-route">
                      <span>{b.hotel?.title || "—"}</span>
                    </div>
                    <div className="booking-details">
                      <div className="booking-row">
                        <span>City</span>
                        <span>{b.hotel?.city || "—"}</span>
                      </div>
                      <div className="booking-row">
                        <span>Check-in</span>
                        <span>{new Date(b.checkIn).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                      <div className="booking-row">
                        <span>Check-out</span>
                        <span>{new Date(b.checkOut).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                      <div className="booking-row">
                        <span>Rooms</span>
                        <span>{b.rooms}</span>
                      </div>
                      <div className="booking-row">
                        <span>Total</span>
                        <span>PKR {b.totalPrice?.toLocaleString()}</span>
                      </div>
                      <div className="booking-row">
                        <span>Booked On</span>
                        <span>{new Date(b.createdAt).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                    </div>
                    <div className="booking-status" style={{ color: statusColor[b.status] || "#aaa" }}>
                      ● {b.status}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
