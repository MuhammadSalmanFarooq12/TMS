import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CITIES = ["Kashmir", "Skardu", "Malam Jabba", "Murree"];

const EditHotel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeCity, setActiveCity] = useState("Kashmir");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [form, setForm] = useState({
    title: "",
    description: "",
    pricePerNight: "",
    rooms: "1",
    bathrooms: "1",
    sofas: "0",
    balconies: "0",
    ac: false,
    wifi: false,
    roomHeater: false,
    led: false,
  });

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/hotels/${id}`);
        const h = res.data;
        setActiveCity(h.city || "Kashmir");
        setCurrentImage(h.image || "");
        setForm({
          title: h.title || "",
          description: h.description || "",
          pricePerNight: h.pricePerNight || "",
          rooms: String(h.rooms ?? "1"),
          bathrooms: String(h.bathrooms ?? "1"),
          sofas: String(h.sofas ?? "0"),
          balconies: String(h.balconies ?? "0"),
          ac: h.ac || false,
          wifi: h.wifi || false,
          roomHeater: h.roomHeater || false,
          led: h.led || false,
        });
      } catch {
        toast.error("Failed to load hotel data");
      }
    };
    fetchHotel();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries({ ...form, city: activeCity }).forEach(([k, v]) => formData.append(k, v));
      if (image) formData.append("image", image);
      await axios.put(`http://localhost:5000/api/hotels/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Hotel updated successfully ✅");
      navigate("/admin/hotels");
    } catch {
      toast.error("Failed to update hotel ❌");
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Edit Hotel</h2>

      {/* City Tabs */}
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {CITIES.map((city) => (
          <button
            key={city}
            type="button"
            onClick={() => setActiveCity(city)}
            style={{
              padding: "8px 18px",
              borderRadius: 8,
              border: "none",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
              background: activeCity === city ? "#1ec0ff" : "rgba(255,255,255,0.1)",
              color: activeCity === city ? "#000" : "#ccc",
              transition: "0.2s",
            }}
          >
            {city}
          </button>
        ))}
      </div>

      <p style={{ color: "#94a3b8", marginBottom: 20, fontSize: 13 }}>
        City: <strong style={{ color: "#1ec0ff" }}>{activeCity}</strong>
      </p>

      <form onSubmit={handleSubmit}>
        <input
          type="text" name="title" placeholder="Hotel Title"
          value={form.title} onChange={handleChange} required
        />
        <textarea
          name="description" placeholder="Description"
          value={form.description} onChange={handleChange} required rows={3}
        />
        <input
          type="number" name="pricePerNight" placeholder="Price Per Night (PKR)"
          value={form.pricePerNight} onChange={handleChange} required
        />

        {/* Features */}
        <p style={{ color: "#e2e8f0", fontWeight: 600, margin: "16px 0 10px" }}>Features</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <label style={{ fontSize: 13, color: "#94a3b8" }}>Rooms</label>
            <select name="rooms" value={form.rooms} onChange={handleChange}>
              {["1","2","3","4","5","6"].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, color: "#94a3b8" }}>Bathrooms</label>
            <select name="bathrooms" value={form.bathrooms} onChange={handleChange}>
              {["1","2","3","4"].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, color: "#94a3b8" }}>Sofas</label>
            <select name="sofas" value={form.sofas} onChange={handleChange}>
              {["0","1","2","3","4"].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 13, color: "#94a3b8" }}>Balconies</label>
            <select name="balconies" value={form.balconies} onChange={handleChange}>
              {["0","1","2","3"].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>

        {/* Facilities */}
        <p style={{ color: "#e2e8f0", fontWeight: 600, margin: "20px 0 10px" }}>Facilities</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {[
            { name: "ac", label: "AC" },
            { name: "wifi", label: "WiFi" },
            { name: "roomHeater", label: "Room Heater" },
            { name: "led", label: "LED TV" },
          ].map(({ name, label }) => (
            <label key={name} style={{ display: "flex", alignItems: "center", gap: 8, color: "#cbd5e1", fontSize: 14, cursor: "pointer" }}>
              <input type="checkbox" name={name} checked={form[name]} onChange={handleChange} />
              {label}
            </label>
          ))}
        </div>

        {/* Image Upload */}
        <p style={{ color: "#e2e8f0", fontWeight: 600, margin: "20px 0 10px" }}>Hotel Image</p>
        {currentImage && (
          <img
            src={`http://localhost:5000${currentImage}`}
            alt="current"
            style={{ width: 120, height: 80, objectFit: "cover", borderRadius: 8, marginBottom: 8, display: "block" }}
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        {image && (
          <p style={{ fontSize: 12, color: "#64748b", marginTop: 6 }}>New: {image.name}</p>
        )}

        <button type="submit" style={{ marginTop: 24 }}>Update Hotel</button>
      </form>
    </div>
  );
};

export default EditHotel;
