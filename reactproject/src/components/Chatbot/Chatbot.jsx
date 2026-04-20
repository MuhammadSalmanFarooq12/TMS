import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import generateTicketPDF from "../../utils/generateTicketPDF";
import "./Chatbot.css";

const API = "http://localhost:5000/api";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm your FastIntercity assistant. Ask me anything, type **book** for a route, **hotel** for a hotel, or **package** for a tour package!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [bookingStep, setBookingStep] = useState(null);
  const [bookingType, setBookingType] = useState(null); // "route" | "hotel" | "package"
  const [routes, setRoutes] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [packages, setPackages] = useState([]);
  const [bookingData, setBookingData] = useState({});

  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const addMsg = (role, content, extra = {}) =>
    setMessages((prev) => [...prev, { role, content, ...extra }]);

  const resetFlow = () => {
    setBookingStep(null);
    setBookingType(null);
    setBookingData({});
  };

  const isValidDate = (str) => /^\d{4}-\d{2}-\d{2}$/.test(str) && !isNaN(new Date(str));
  const isFuture = (str) => { const t = new Date(); t.setHours(0,0,0,0); return new Date(str) >= t; };

  // ── Start route booking ──
  const startRouteBooking = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/chat/routes`);
      setRoutes(res.data);
      setBookingType("route");
      setBookingStep("route");
      setBookingData({});
      addMsg("assistant", "Sure! Here are the available routes. Pick one:", { type: "routes", routes: res.data });
    } catch { addMsg("assistant", "Could not load routes. Please try again."); }
    finally { setLoading(false); }
  };

  // ── Start hotel booking ──
  const startHotelBooking = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/chat/hotels`);
      setHotels(res.data);
      setBookingType("hotel");
      setBookingStep("h_hotel");
      setBookingData({});
      addMsg("assistant", "Sure! Here are the available hotels. Pick one:", { type: "hotels", hotels: res.data });
    } catch { addMsg("assistant", "Could not load hotels. Please try again."); }
    finally { setLoading(false); }
  };

  // ── Start package booking ──
  const startPackageBooking = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/chat/packages`);
      setPackages(res.data);
      setBookingType("package");
      setBookingStep("p_package");
      setBookingData({});
      addMsg("assistant", "Sure! Here are the available tour packages. Pick one:", { type: "packages", packages: res.data });
    } catch { addMsg("assistant", "Could not load packages. Please try again."); }
    finally { setLoading(false); }
  };

  // ── Route booking steps ──
  const handleRouteStep = (text) => {
    const step = bookingStep;
    if (step === "route") {
      const idx = parseInt(text) - 1;
      if (isNaN(idx) || idx < 0 || idx >= routes.length) { addMsg("assistant", `Please enter a number between 1 and ${routes.length}.`); return; }
      const s = routes[idx];
      setBookingData({ route: s._id, routeLabel: `${s.from} → ${s.to}`, baseFare: s.baseFare, availableSeats: s.availableSeats });
      setBookingStep("name"); addMsg("user", text);
      addMsg("assistant", `Great choice! **${s.from} → ${s.to}** (PKR ${s.baseFare}/seat)\n\nPlease enter your full name:`);
      return;
    }
    if (step === "name") {
      if (text.trim().length < 2) { addMsg("assistant", "Please enter a valid name."); return; }
      setBookingData((p) => ({ ...p, passengerName: text.trim() })); setBookingStep("email");
      addMsg("user", text); addMsg("assistant", "Enter your email address:"); return;
    }
    if (step === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())) { addMsg("assistant", "Please enter a valid email."); return; }
      setBookingData((p) => ({ ...p, email: text.trim() })); setBookingStep("phone");
      addMsg("user", text); addMsg("assistant", "Enter your phone number:"); return;
    }
    if (step === "phone") {
      if (text.trim().length < 7) { addMsg("assistant", "Please enter a valid phone number."); return; }
      setBookingData((p) => ({ ...p, phone: text.trim() })); setBookingStep("seats");
      addMsg("user", text); addMsg("assistant", "How many seats do you want to book?"); return;
    }
    if (step === "seats") {
      const seats = parseInt(text);
      if (isNaN(seats) || seats < 1) { addMsg("assistant", "Please enter a valid number of seats."); return; }
      if (bookingData.availableSeats && seats > bookingData.availableSeats) { addMsg("assistant", `Only ${bookingData.availableSeats} seats available.`); return; }
      setBookingData((p) => ({ ...p, seats })); setBookingStep("date");
      addMsg("user", text); addMsg("assistant", "Enter your travel date (YYYY-MM-DD):"); return;
    }
    if (step === "date") {
      if (!isValidDate(text.trim())) { addMsg("assistant", "Please enter a valid date (YYYY-MM-DD)."); return; }
      if (!isFuture(text.trim())) { addMsg("assistant", "Date cannot be in the past."); return; }
      const total = bookingData.seats * bookingData.baseFare;
      setBookingData((p) => ({ ...p, travelDate: text.trim(), total })); setBookingStep("confirm");
      addMsg("user", text);
      addMsg("assistant",
        `Here's your booking summary:\n\n🛣️ Route: ${bookingData.routeLabel}\n👤 Name: ${bookingData.passengerName}\n📧 Email: ${bookingData.email}\n📞 Phone: ${bookingData.phone}\n💺 Seats: ${bookingData.seats}\n📅 Date: ${text.trim()}\n💰 Total: PKR ${total.toLocaleString()}\n\nType **confirm** to book or **cancel** to abort.`
      ); return;
    }
    if (step === "confirm") {
      if (text.toLowerCase() === "cancel") { addMsg("user", text); addMsg("assistant", "Booking cancelled. How else can I help you?"); resetFlow(); return; }
      if (text.toLowerCase() !== "confirm") { addMsg("assistant", "Type **confirm** to proceed or **cancel** to abort."); return; }
      addMsg("user", text); setLoading(true);
      axios.post(`${API}/bookings`, { route: bookingData.route, passengerName: bookingData.passengerName, email: bookingData.email, phone: bookingData.phone, seats: bookingData.seats, travelDate: bookingData.travelDate })
        .then((res) => {
          generateTicketPDF({
            bookingId: res.data._id,
            passengerName: bookingData.passengerName,
            email: bookingData.email,
            phone: bookingData.phone,
            from: bookingData.routeLabel.split(" → ")[0],
            to: bookingData.routeLabel.split(" → ")[1],
            travelDate: bookingData.travelDate,
            seats: bookingData.seats,
            pricePerSeat: bookingData.baseFare,
            totalPrice: bookingData.total,
          }, "route");
          addMsg("assistant", `🎉 Booking confirmed! Your seat on **${bookingData.routeLabel}** is reserved. Your ticket has been downloaded. Safe travels!`);
        })
        .catch((err) => addMsg("assistant", `❌ ${err.response?.data?.message || "Booking failed. Please try again."}`))
        .finally(() => { setLoading(false); resetFlow(); });
    }
  };

  // ── Hotel booking steps ──
  const handleHotelStep = (text) => {
    const step = bookingStep;
    if (step === "h_hotel") {
      const idx = parseInt(text) - 1;
      if (isNaN(idx) || idx < 0 || idx >= hotels.length) { addMsg("assistant", `Please enter a number between 1 and ${hotels.length}.`); return; }
      const h = hotels[idx];
      setBookingData({ hotelId: h._id, hotelLabel: h.title, city: h.city, pricePerNight: h.pricePerNight });
      setBookingStep("h_name"); addMsg("user", text);
      addMsg("assistant", `Great choice! **${h.title}** — ${h.city} (PKR ${h.pricePerNight}/night)\n\nPlease enter your full name:`); return;
    }
    if (step === "h_name") {
      if (text.trim().length < 2) { addMsg("assistant", "Please enter a valid name."); return; }
      setBookingData((p) => ({ ...p, guestName: text.trim() })); setBookingStep("h_email");
      addMsg("user", text); addMsg("assistant", "Enter your email address:"); return;
    }
    if (step === "h_email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())) { addMsg("assistant", "Please enter a valid email."); return; }
      setBookingData((p) => ({ ...p, email: text.trim() })); setBookingStep("h_phone");
      addMsg("user", text); addMsg("assistant", "Enter your phone number:"); return;
    }
    if (step === "h_phone") {
      if (text.trim().length < 7) { addMsg("assistant", "Please enter a valid phone number."); return; }
      setBookingData((p) => ({ ...p, phone: text.trim() })); setBookingStep("h_rooms");
      addMsg("user", text); addMsg("assistant", "How many rooms do you need?"); return;
    }
    if (step === "h_rooms") {
      const rooms = parseInt(text);
      if (isNaN(rooms) || rooms < 1) { addMsg("assistant", "Please enter a valid number of rooms."); return; }
      setBookingData((p) => ({ ...p, rooms })); setBookingStep("h_checkin");
      addMsg("user", text); addMsg("assistant", "Enter your check-in date (YYYY-MM-DD):"); return;
    }
    if (step === "h_checkin") {
      if (!isValidDate(text.trim())) { addMsg("assistant", "Please enter a valid date (YYYY-MM-DD)."); return; }
      if (!isFuture(text.trim())) { addMsg("assistant", "Check-in date cannot be in the past."); return; }
      setBookingData((p) => ({ ...p, checkIn: text.trim() })); setBookingStep("h_checkout");
      addMsg("user", text); addMsg("assistant", "Enter your check-out date (YYYY-MM-DD):"); return;
    }
    if (step === "h_checkout") {
      if (!isValidDate(text.trim())) { addMsg("assistant", "Please enter a valid date (YYYY-MM-DD)."); return; }
      if (new Date(text.trim()) <= new Date(bookingData.checkIn)) { addMsg("assistant", "Check-out must be after check-in."); return; }
      const nights = Math.ceil((new Date(text.trim()) - new Date(bookingData.checkIn)) / 86400000);
      const total = bookingData.rooms * nights * bookingData.pricePerNight;
      setBookingData((p) => ({ ...p, checkOut: text.trim(), nights, total })); setBookingStep("h_confirm");
      addMsg("user", text);
      addMsg("assistant",
        `Here's your hotel booking summary:\n\n🏨 Hotel: ${bookingData.hotelLabel} — ${bookingData.city}\n👤 Name: ${bookingData.guestName}\n📧 Email: ${bookingData.email}\n📞 Phone: ${bookingData.phone}\n🛏️ Rooms: ${bookingData.rooms}\n📅 Check-in: ${bookingData.checkIn}\n📅 Check-out: ${text.trim()}\n🌙 Nights: ${nights}\n💰 Total: PKR ${total.toLocaleString()}\n\nType **confirm** to book or **cancel** to abort.`
      ); return;
    }
    if (step === "h_confirm") {
      if (text.toLowerCase() === "cancel") { addMsg("user", text); addMsg("assistant", "Hotel booking cancelled. How else can I help you?"); resetFlow(); return; }
      if (text.toLowerCase() !== "confirm") { addMsg("assistant", "Type **confirm** to proceed or **cancel** to abort."); return; }
      addMsg("user", text); setLoading(true);
      axios.post(`${API}/hotel-bookings`, { hotelId: bookingData.hotelId, guestName: bookingData.guestName, email: bookingData.email, phone: bookingData.phone, rooms: bookingData.rooms, checkIn: bookingData.checkIn, checkOut: bookingData.checkOut })
        .then((res) => {
          generateTicketPDF({
            bookingId: res.data._id,
            guestName: bookingData.guestName,
            email: bookingData.email,
            phone: bookingData.phone,
            hotelLabel: bookingData.hotelLabel,
            city: bookingData.city,
            rooms: bookingData.rooms,
            checkIn: bookingData.checkIn,
            checkOut: bookingData.checkOut,
            nights: bookingData.nights,
            totalPrice: bookingData.total,
          }, "hotel");
          addMsg("assistant", `🎉 Hotel booking confirmed! **${bookingData.hotelLabel}** is reserved. Your ticket has been downloaded. Enjoy your stay!`);
        })
        .catch((err) => addMsg("assistant", `❌ ${err.response?.data?.message || "Booking failed. Please try again."}`))
        .finally(() => { setLoading(false); resetFlow(); });
    }
  };

  // ── Package booking steps ──
  const handlePackageStep = (text) => {
    const step = bookingStep;
    if (step === "p_package") {
      const idx = parseInt(text) - 1;
      if (isNaN(idx) || idx < 0 || idx >= packages.length) { addMsg("assistant", `Please enter a number between 1 and ${packages.length}.`); return; }
      const p = packages[idx];
      setBookingData({ packageId: p._id, packageLabel: p.title, price: p.price, maxSeats: p.maxSeats, duration: p.duration });
      setBookingStep("p_name"); addMsg("user", text);
      addMsg("assistant", `Great choice! **${p.title}** (PKR ${p.price}/person${p.duration ? ` · ${p.duration}` : ""})\n\nPlease enter your full name:`); return;
    }
    if (step === "p_name") {
      if (text.trim().length < 2) { addMsg("assistant", "Please enter a valid name."); return; }
      setBookingData((p) => ({ ...p, passengerName: text.trim() })); setBookingStep("p_email");
      addMsg("user", text); addMsg("assistant", "Enter your email address:"); return;
    }
    if (step === "p_email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())) { addMsg("assistant", "Please enter a valid email."); return; }
      setBookingData((p) => ({ ...p, email: text.trim() })); setBookingStep("p_phone");
      addMsg("user", text); addMsg("assistant", "Enter your phone number:"); return;
    }
    if (step === "p_phone") {
      if (text.trim().length < 7) { addMsg("assistant", "Please enter a valid phone number."); return; }
      setBookingData((p) => ({ ...p, phone: text.trim() })); setBookingStep("p_seats");
      addMsg("user", text); addMsg("assistant", "How many seats do you need?"); return;
    }
    if (step === "p_seats") {
      const seats = parseInt(text);
      if (isNaN(seats) || seats < 1) { addMsg("assistant", "Please enter a valid number of seats."); return; }
      if (bookingData.maxSeats && seats > bookingData.maxSeats) { addMsg("assistant", `Only ${bookingData.maxSeats} seats available for this package.`); return; }
      setBookingData((p) => ({ ...p, seats })); setBookingStep("p_date");
      addMsg("user", text); addMsg("assistant", "Enter your travel date (YYYY-MM-DD):"); return;
    }
    if (step === "p_date") {
      if (!isValidDate(text.trim())) { addMsg("assistant", "Please enter a valid date (YYYY-MM-DD)."); return; }
      if (!isFuture(text.trim())) { addMsg("assistant", "Date cannot be in the past."); return; }
      const total = bookingData.seats * bookingData.price;
      setBookingData((p) => ({ ...p, travelDate: text.trim(), total })); setBookingStep("p_confirm");
      addMsg("user", text);
      addMsg("assistant",
        `Here's your package booking summary:\n\n🧳 Package: ${bookingData.packageLabel}\n👤 Name: ${bookingData.passengerName}\n📧 Email: ${bookingData.email}\n📞 Phone: ${bookingData.phone}\n💺 Seats: ${bookingData.seats}\n📅 Date: ${text.trim()}\n💰 Total: PKR ${total.toLocaleString()}\n\nType **confirm** to book or **cancel** to abort.`
      ); return;
    }
    if (step === "p_confirm") {
      if (text.toLowerCase() === "cancel") { addMsg("user", text); addMsg("assistant", "Package booking cancelled. How else can I help you?"); resetFlow(); return; }
      if (text.toLowerCase() !== "confirm") { addMsg("assistant", "Type **confirm** to proceed or **cancel** to abort."); return; }
      addMsg("user", text); setLoading(true);
      axios.post(`${API}/package-bookings`, { packageId: bookingData.packageId, passengerName: bookingData.passengerName, email: bookingData.email, phone: bookingData.phone, seats: bookingData.seats, travelDate: bookingData.travelDate })
        .then((res) => {
          generateTicketPDF({
            bookingId: res.data._id,
            passengerName: bookingData.passengerName,
            email: bookingData.email,
            phone: bookingData.phone,
            packageTitle: bookingData.packageLabel,
            travelDate: bookingData.travelDate,
            seats: bookingData.seats,
            pricePerSeat: bookingData.price,
            totalPrice: bookingData.total,
          }, "package");
          addMsg("assistant", `🎉 Package booking confirmed! **${bookingData.packageLabel}** is booked. Your ticket has been downloaded. Get ready for an amazing trip!`);
        })
        .catch((err) => addMsg("assistant", `❌ ${err.response?.data?.message || "Booking failed. Please try again."}`))
        .finally(() => { setLoading(false); resetFlow(); });
    }
  };

  // ── Send message ──
  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    if (bookingType === "route"   && bookingStep && bookingStep !== "route")     { handleRouteStep(text);   return; }
    if (bookingType === "hotel"   && bookingStep && bookingStep !== "h_hotel")   { handleHotelStep(text);   return; }
    if (bookingType === "package" && bookingStep && bookingStep !== "p_package") { handlePackageStep(text); return; }

    if (/\b(package|tour|trip)\b/i.test(text) && !bookingStep) { addMsg("user", text); await startPackageBooking(); return; }
    if (/\b(hotel|stay|room|accommodation|lodge)\b/i.test(text) && !bookingStep) { addMsg("user", text); await startHotelBooking(); return; }
    if (/\b(book|booking|reserve|ticket|seat)\b/i.test(text) && !bookingStep) { addMsg("user", text); await startRouteBooking(); return; }

    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);
    try {
      const res = await axios.post(`${API}/chat`, { messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })) });
      addMsg("assistant", res.data.reply);
    } catch { addMsg("assistant", "Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  const handleKeyDown = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const renderContent = (content) => {
    const parts = content.split(/\*\*(.*?)\*\*/g);
    return parts.map((p, i) => i % 2 === 1 ? <strong key={i}>{p}</strong> : p);
  };

  const confirmStep = ["confirm", "h_confirm", "p_confirm"].includes(bookingStep);

  return (
    <div className="chatbot-wrapper">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">🤖</div>
              <div>
                <p className="chatbot-name">FastIntercity Assistant</p>
                <p className="chatbot-status">Online</p>
              </div>
            </div>
            <button className="chatbot-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.role}`}>
                {msg.type === "routes" ? (
                  <div className="chatbot-routes">
                    {msg.routes.map((r, idx) => (
                      <button key={r._id} className="chatbot-route-btn" onClick={() => handleRouteStep(String(idx + 1))}>
                        <span className="route-num">{idx + 1}</span>
                        <span className="route-info">
                          <strong>{r.from} → {r.to}</strong>
                          <small>PKR {r.baseFare} · {r.availableSeats} seats · {r.duration}</small>
                        </span>
                      </button>
                    ))}
                  </div>
                ) : msg.type === "hotels" ? (
                  <div className="chatbot-routes">
                    {msg.hotels.map((h, idx) => (
                      <button key={h._id} className="chatbot-route-btn" onClick={() => handleHotelStep(String(idx + 1))}>
                        <span className="route-num">{idx + 1}</span>
                        <span className="route-info">
                          <strong>{h.title}</strong>
                          <small>{h.city} · PKR {h.pricePerNight}/night</small>
                        </span>
                      </button>
                    ))}
                  </div>
                ) : msg.type === "packages" ? (
                  <div className="chatbot-routes">
                    {msg.packages.map((p, idx) => (
                      <button key={p._id} className="chatbot-route-btn" onClick={() => handlePackageStep(String(idx + 1))}>
                        <span className="route-num">{idx + 1}</span>
                        <span className="route-info">
                          <strong>{p.title}</strong>
                          <small>PKR {p.price}/person{p.duration ? ` · ${p.duration}` : ""} · {p.maxSeats} seats</small>
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <p style={{ whiteSpace: "pre-line" }}>{renderContent(msg.content)}</p>
                )}
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg assistant">
                <p className="chatbot-typing"><span></span><span></span><span></span></p>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chatbot-input-area">
            <textarea
              rows={1}
              placeholder={
                confirmStep ? "confirm / cancel"
                : bookingStep ? "Type your answer..."
                : "Ask, or type: book · hotel · package"
              }
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = Math.min(e.target.scrollHeight, 96) + "px";
              }}
              onKeyDown={handleKeyDown}
            />
            <button onClick={sendMessage} disabled={loading || !input.trim()}>➤</button>
          </div>
        </div>
      )}
      <button className="chatbot-fab" onClick={() => setIsOpen((p) => !p)} title="Chat with us">
        {isOpen ? "✕" : "🤖"}
      </button>
    </div>
  );
};

export default Chatbot;
