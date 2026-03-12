import { useState } from "react";
import "./BookingComp.css";

function BookingComp() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1,
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("BookingComp Submitted Successfully!");
  };

  return (
    <div className="BookingComp-container">
      <h1 className="BookingComp-title">Book Your Journey</h1>

      <form className="BookingComp-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-group">
            <label>From</label>
            <select name="from" onChange={handleChange} required>
              <option value="">Select City</option>
              <option value="Multan">Multan</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Murree">Murree</option>
            </select>
          </div>

          <div className="input-group">
            <label>To</label>
            <select name="to" onChange={handleChange} required>
              <option value="">Select City</option>
              <option value="Multan">Multan</option>
              <option value="Lahore">Lahore</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Murree">Murree</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="input-group">
            <label>Travel Date</label>
            <input type="date" name="date" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Passengers</label>
            <input
              type="number"
              name="passengers"
              min="1"
              max="5"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" name="name" onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" onChange={handleChange} required />
          </div>
        </div>

        <div className="input-group">
          <label>Phone Number</label>
          <input type="text" name="phone" onChange={handleChange} required />
        </div>

        <button type="submit" className="book-btn">
          Confirm Booking
        </button>
      </form>
    </div>
  );
}

export default BookingComp;