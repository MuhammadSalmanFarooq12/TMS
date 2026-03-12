import { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import "./CityDetail.css";

const CityDetail = () => {
  const { id } = useParams();

  const [city, setCity] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    passengerName: "",
    email: "",
    seats: 1,
    travelDate: "",
  });

  useEffect(() => {
    const fetchCityById = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cities/${id}`
        );
        setCity(res.data);
      } catch (error) {
        console.error("Error fetching city:", error);
      }
    };

    fetchCityById();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/bookings", {
        route: id, // 👉 city id is sent in the same booking table
        ...formData,
      });

      alert("Booking Successful 🎉");
      setShowForm(false);

    } catch (error) {
      console.error(error);
      alert("Booking Failed ❌");
    }
  };

  if (!city)
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
    <section className="city-detail">
      <div className="city-detail-container">

        <img
          src={city.image}
          alt={city.name}
          className="city-detail-image"
        />

        <div className="city-detail-info">
          <h2>{city.name}</h2>

          <p>
            <strong>Province:</strong> {city.province}
          </p>

          <p>
            <strong>Country:</strong> {city.country}
          </p>

          {city.description && (
            <p>
              <strong>Description:</strong> {city.description}
            </p>
          )}

          <button
            className="book-btn"
            onClick={() => setShowForm(!showForm)}
          >
            Book Visit
          </button>

          {showForm && (
            <form className="booking-form" onSubmit={handleBooking}>

              <input
                type="text"
                name="passengerName"
                placeholder="Your Name"
                required
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
                onChange={handleChange}
              />

              <input
                type="number"
                name="seats"
                min="1"
                placeholder="Number of Seats"
                required
                onChange={handleChange}
              />

              <input
                type="date"
                name="travelDate"
                required
                onChange={handleChange}
              />

              <button type="submit">Confirm Booking</button>

            </form>
          )}

        </div>
      </div>
    </section>
  );
};

export default CityDetail;