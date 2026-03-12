import { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./BookingComp.css";

const API_BASE = "http://localhost:5000/api";

// Fleet fare add-on (per seat) — same as backend: Mercedes +2000, Scania +1000
const FLEET_FARE_ADDON = {
  Mercedes: 2000,
  Scania: 1000,
};

function getFleetAddon(fleetName) {
  if (!fleetName) return 0;
  return FLEET_FARE_ADDON[fleetName] ?? 0;
}

function BookingComp() {
  const [routes, setRoutes] = useState([]);
  const [fleets, setFleets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1,
    fleet: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [routesRes, busesRes] = await Promise.all([
          axios.get(`${API_BASE}/routes`),
          axios.get(`${API_BASE}/buses`),
        ]);
        setRoutes(routesRes.data || []);
        const names = [...new Set((busesRes.data || []).map((b) => b.name).filter(Boolean))];
        setFleets(names);
      } catch (err) {
        console.error("Error fetching routes/fleets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "passengers" ? Math.max(1, parseInt(value, 10) || 1) : value,
    }));
  };

  const selectedRoute = routes.find(
    (r) => r.from === formData.from && r.to === formData.to
  );
  const baseFare = selectedRoute ? selectedRoute.baseFare : 0;
  const fleetAddon = getFleetAddon(formData.fleet);
  const farePerSeat = baseFare + fleetAddon;
  const estimatedTotal = farePerSeat * (formData.passengers || 1);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const travelDateValue = formData.date
    ? new Date(formData.date + "T12:00:00")
    : null;

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date ? date.toISOString().slice(0, 10) : "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRoute) {
      alert("Please select From and To to get a valid route.");
      return;
    }
    if (!formData.date) {
      alert("Please select a travel date.");
      return;
    }

    setSubmitLoading(true);
    try {
      await axios.post(`${API_BASE}/bookings`, {
        route: selectedRoute._id,
        passengerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        seats: formData.passengers,
        travelDate: formData.date,
        fleet: formData.fleet || undefined,
      });
      alert("Booking submitted successfully!");
      setFormData({
        from: "",
        to: "",
        date: "",
        passengers: 1,
        fleet: "",
        name: "",
        email: "",
        phone: "",
      });
    } catch (err) {
      const msg = err.response?.data?.message || err.message || "Booking failed.";
      alert(msg);
    } finally {
      setSubmitLoading(false);
    }
  };

  const fromCities = [...new Set(routes.map((r) => r.from).filter(Boolean))].sort();
  const toCities = [...new Set(routes.map((r) => r.to).filter(Boolean))].sort();

  if (loading) {
    return (
      <div className="BookingComp-container">
        <p className="BookingComp-loading">Loading...</p>
      </div>
    );
  }

  return (
    <div className="BookingComp-container">
      <h1 className="BookingComp-title">Book Your Journey</h1>

      <form className="BookingComp-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-group">
            <label>From</label>
            <select name="from" value={formData.from} onChange={handleChange} required>
              <option value="">Select City</option>
              {fromCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label>To</label>
            <select name="to" value={formData.to} onChange={handleChange} required>
              <option value="">Select City</option>
              {toCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="input-group">
            <label htmlFor="booking-travel-date">Travel Date</label>
            <DatePicker
              id="booking-travel-date"
              selected={travelDateValue}
              onChange={handleDateChange}
              minDate={today}
              dateFormat="dd/MM/yyyy"
              placeholderText="Click to open calendar"
              className="BookingComp-date-input"
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
            />
          </div>

          <div className="input-group">
            <label>Passengers</label>
            <input
              type="number"
              name="passengers"
              min="1"
              max="20"
              value={formData.passengers}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label>Choose Fleet</label>
          <select name="fleet" value={formData.fleet} onChange={handleChange}>
            <option value="">No preference</option>
            {fleets.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
          {formData.fleet && (
            <span className="BookingComp-fare-note">
              {formData.fleet}: +PKR {getFleetAddon(formData.fleet)} per seat
            </span>
          )}
        </div>

        {selectedRoute && (
          <div className="BookingComp-fare-summary">
            <strong>Fare:</strong> Base (from route) PKR {baseFare}
            {fleetAddon > 0 && (
              <> + Fleet ({formData.fleet}) PKR {fleetAddon}</>
            )}
            {" "}× {formData.passengers} seat(s) = <strong>PKR {estimatedTotal}</strong>
          </div>
        )}

        <div className="row">
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label>Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="book-btn" disabled={submitLoading}>
          {submitLoading ? "Submitting..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}

export default BookingComp;
