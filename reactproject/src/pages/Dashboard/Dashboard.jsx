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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    axios
      .get("http://localhost:5000/api/users/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBookings(res.data))
      .catch(() => setBookings([]))
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

        {/* Booking History */}
        <div className="dashboard-section">
          <h3>My Booking History</h3>

          {loading ? (
            <p className="dash-loading">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <div className="no-bookings">
              <p>No bookings found.</p>
              <button onClick={() => navigate("/routes")}>Browse Routes</button>
            </div>
          ) : (
            <div className="bookings-grid">
              {bookings.map((b) => (
                <div key={b._id} className="booking-card">
                  <div className="booking-route">
                    <span>{b.route?.from || "—"}</span>
                    <span className="arrow">→</span>
                    <span>{b.route?.to || "—"}</span>
                  </div>
                  <div className="booking-details">
                    <div className="booking-row">
                      <span>Date</span>
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
                  <div
                    className="booking-status"
                    style={{ color: statusColor[b.status] || "#aaa" }}
                  >
                    ● {b.status}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
