import { useEffect, useState } from "react";
import axios from "axios";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, BarChart, Bar, Legend,
} from "recharts";
import "./AdminDashboard.css";

const API = "http://localhost:5000/api";

const StatCard = ({ label, value, icon, color, sub }) => (
  <div className="dash-stat-card" style={{ "--accent": color }}>
    <div className="dash-stat-icon">{icon}</div>
    <div className="dash-stat-body">
      <span className="dash-stat-label">{label}</span>
      <span className="dash-stat-value">{value ?? "—"}</span>
      {sub && <span className="dash-stat-sub">{sub}</span>}
    </div>
    <div className="dash-stat-bar" />
  </div>
);

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    buses: 0, routes: 0, bookings: 0,
    users: 0, packages: 0, revenue: 0, hotels: 0,
  });
  const [monthlyData, setMonthlyData] = useState([]);
  const [recentBookings, setRecentBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [busesRes, routesRes, bookingsRes, usersRes, packagesRes, hotelsRes, pkgBookingsRes, hotelBookingsRes] =
          await Promise.all([
            axios.get(`${API}/buses`),
            axios.get(`${API}/routes`),
            axios.get(`${API}/bookings`),
            axios.get(`${API}/users`),
            axios.get(`${API}/packages`),
            axios.get(`${API}/hotels`),
            axios.get(`${API}/package-bookings`),
            axios.get(`${API}/hotel-bookings`),
          ]);

        const routeBookings   = (bookingsRes.data || []).map((b) => ({ ...b, _type: "Route" }));
        const pkgBookings     = (pkgBookingsRes.data || []).map((b) => ({ ...b, _type: "Package" }));
        const hotelBookings   = (hotelBookingsRes.data || []).map((b) => ({ ...b, _type: "Hotel" }));
        const allBookings     = [...routeBookings, ...pkgBookings, ...hotelBookings];

        const totalRevenue = allBookings.reduce((s, b) => s + (b.totalPrice || 0), 0);

        setStats({
          buses:    busesRes.data?.length    ?? 0,
          routes:   routesRes.data?.length   ?? 0,
          bookings: allBookings.length,
          users:    usersRes.data?.length    ?? 0,
          packages: packagesRes.data?.length ?? 0,
          revenue:  totalRevenue,
          hotels:   hotelsRes.data?.length   ?? 0,
        });

        // Monthly revenue + bookings count across all types
        const monthMap = {};
        allBookings.forEach((b) => {
          const d   = new Date(b.createdAt);
          const key = d.toLocaleString("default", { month: "short", year: "2-digit" });
          if (!monthMap[key]) monthMap[key] = { month: key, revenue: 0, bookings: 0 };
          monthMap[key].revenue  += b.totalPrice || 0;
          monthMap[key].bookings += 1;
        });

        const sorted = Object.values(monthMap).sort(
          (a, b) => new Date("1 " + a.month) - new Date("1 " + b.month)
        );
        setMonthlyData(sorted);

        // Recent 5 bookings across all types
        setRecentBookings(
          [...allBookings]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5)
        );
      } catch (err) {
        console.error("Dashboard fetch error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const fmt = (n) =>
    n >= 1000000
      ? `PKR ${(n / 1000000).toFixed(1)}M`
      : n >= 1000
      ? `PKR ${(n / 1000).toFixed(1)}K`
      : `PKR ${n}`;

  return (
    <div className="dash-root">

      {/* ── Header ── */}
      <div className="dash-header">
        <div>
          <h1 className="dash-title">Dashboard</h1>
          <p className="dash-subtitle">Welcome back, Admin 👋</p>
        </div>
        <span className="dash-date">
          {new Date().toLocaleDateString("en-PK", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </span>
      </div>

      {/* ── Stat Cards ── */}
      <div className="dash-stats-grid">
        <StatCard label="Total Buses"     value={stats.buses}    icon="🚌" color="#38bdf8" sub="Active fleet" />
        <StatCard label="Total Routes"    value={stats.routes}   icon="🗺️" color="#a78bfa" sub="Intercity routes" />
        <StatCard label="Bookings"        value={stats.bookings} icon="🎟️" color="#34d399" sub="All time" />
        <StatCard label="Registered Users" value={stats.users}  icon="👥" color="#fb923c" sub="Platform users" />
        <StatCard label="Tour Packages"   value={stats.packages} icon="🧳" color="#f472b6" sub="Available packages" />
        <StatCard label="Hotels"           value={stats.hotels}   icon="🏨" color="#2dd4bf" sub="Listed properties" />
        <StatCard label="Total Revenue"   value={fmt(stats.revenue)} icon="💰" color="#facc15" sub="From bookings" />
      </div>

      {/* ── Charts Row ── */}
      <div className="dash-charts-row">

        {/* Area Chart — Revenue */}
        <div className="dash-chart-box">
          <h3 className="dash-chart-title">Monthly Revenue</h3>
          {loading ? (
            <p className="dash-chart-empty">Loading...</p>
          ) : monthlyData.length === 0 ? (
            <p className="dash-chart-empty">No data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#38bdf8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}   />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#fff" }}
                  formatter={(v) => [`PKR ${v.toLocaleString()}`, "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#38bdf8" strokeWidth={2.5}
                  fill="url(#revGrad)" dot={{ fill: "#38bdf8", r: 4 }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Bar Chart — Bookings */}
        <div className="dash-chart-box">
          <h3 className="dash-chart-title">Monthly Bookings</h3>
          {loading ? (
            <p className="dash-chart-empty">Loading...</p>
          ) : monthlyData.length === 0 ? (
            <p className="dash-chart-empty">No data yet.</p>
          ) : (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" tick={{ fill: "#94a3b8", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#fff" }}
                  formatter={(v) => [v, "Bookings"]}
                />
                <Bar dataKey="bookings" fill="#a78bfa" radius={[6, 6, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

      </div>

      {/* ── Recent Bookings ── */}
      <div className="dash-recent-box">
        <h3 className="dash-chart-title">Recent Bookings</h3>
        {recentBookings.length === 0 ? (
          <p className="dash-chart-empty">No bookings yet.</p>
        ) : (
          <div className="table-wrapper">
            <table className="dash-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Passenger / Guest</th>
                  <th>Email</th>
                  <th>Details</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((b) => {
                  const name   = b.passengerName || b.guestName || "—";
                  const detail = b._type === "Route"
                    ? `${b.seats || 1} seat(s) · ${b.fleet || ""}`
                    : b._type === "Package"
                    ? `${b.seats || 1} seat(s)`
                    : b._type === "Hotel"
                    ? `${b.rooms || 1} room(s) · ${b.hotelTitle || b.hotelCity || ""}`
                    : "—";
                  const typeColors = {
                    Route:   "#38bdf8",
                    Package: "#a78bfa",
                    Hotel:   "#34d399",
                  };
                  return (
                    <tr key={b._id}>
                      <td>
                        <span style={{
                          fontSize: 11, fontWeight: 700, padding: "2px 8px",
                          borderRadius: 20, background: `${typeColors[b._type]}22`,
                          color: typeColors[b._type],
                        }}>
                          {b._type}
                        </span>
                      </td>
                      <td>{name}</td>
                      <td>{b.email || "—"}</td>
                      <td>{detail}</td>
                      <td>PKR {(b.totalPrice || 0).toLocaleString()}</td>
                      <td>{new Date(b.createdAt).toLocaleDateString("en-PK")}</td>
                      <td>
                        <span className={`dash-badge dash-badge--${b.status || "confirmed"}`}>
                          {b.status || "confirmed"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminDashboard;
