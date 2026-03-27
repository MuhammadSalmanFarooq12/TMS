import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";

const API = "http://localhost:5000/api";

// booking steps in order
const STEPS = ["route", "name", "email", "phone", "seats", "date", "confirm"];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! 👋 I'm your FastIntercity assistant. Ask me anything or type **book** to reserve a seat right here!",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // booking flow state
  const [booking, setBooking] = useState(null); // null = not in booking flow
  const [bookingStep, setBookingStep] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [bookingData, setBookingData] = useState({});

  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const addMsg = (role, content, extra = {}) =>
    setMessages((prev) => [...prev, { role, content, ...extra }]);

  // ── Start booking flow ──
  const startBooking = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/chat/routes`);
      const list = res.data;
      setRoutes(list);
      setBooking({});
      setBookingStep("route");
      setBookingData({});
      addMsg(
        "assistant",
        "Sure! Here are the available routes. Pick a number to select your route:",
        { type: "routes", routes: list }
      );
    } catch {
      addMsg("assistant", "Could not load routes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Handle each booking step ──
  const handleBookingStep = async (text) => {
    const step = bookingStep;

    if (step === "route") {
      const idx = parseInt(text) - 1;
      if (isNaN(idx) || idx < 0 || idx >= routes.length) {
        addMsg("assistant", `Please enter a number between 1 and ${routes.length}.`);
        return;
      }
      const selected = routes[idx];
      setBookingData((prev) => ({ ...prev, route: selected._id, routeLabel: `${selected.from} → ${selected.to}` }));
      setBookingStep("name");
      addMsg("user", text);
      addMsg("assistant", `Great choice! **${selected.from} → ${selected.to}** (PKR ${selected.baseFare}/seat)\n\nPlease enter your full name:`);
      return;
    }

    if (step === "name") {
      if (text.trim().length < 2) { addMsg("assistant", "Please enter a valid name."); return; }
      setBookingData((prev) => ({ ...prev, passengerName: text.trim() }));
      setBookingStep("email");
      addMsg("user", text);
      addMsg("assistant", "Enter your email address:");
      return;
    }

    if (step === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())) {
        addMsg("assistant", "Please enter a valid email address.");
        return;
      }
      setBookingData((prev) => ({ ...prev, email: text.trim() }));
      setBookingStep("phone");
      addMsg("user", text);
      addMsg("assistant", "Enter your phone number:");
      return;
    }

    if (step === "phone") {
      if (text.trim().length < 7) { addMsg("assistant", "Please enter a valid phone number."); return; }
      setBookingData((prev) => ({ ...prev, phone: text.trim() }));
      setBookingStep("seats");
      addMsg("user", text);
      addMsg("assistant", "How many seats do you want to book?");
      return;
    }

    if (step === "seats") {
      const seats = parseInt(text);
      if (isNaN(seats) || seats < 1) { addMsg("assistant", "Please enter a valid number of seats (minimum 1)."); return; }
      const selectedRoute = routes.find((r) => r._id === bookingData.route);
      if (selectedRoute && seats > selectedRoute.availableSeats) {
        addMsg("assistant", `Only ${selectedRoute.availableSeats} seats available on this route.`);
        return;
      }
      setBookingData((prev) => ({ ...prev, seats }));
      setBookingStep("date");
      addMsg("user", text);
      addMsg("assistant", "Enter your travel date (YYYY-MM-DD):");
      return;
    }

    if (step === "date") {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(text.trim()) || isNaN(new Date(text.trim()))) {
        addMsg("assistant", "Please enter a valid date in YYYY-MM-DD format (e.g. 2025-08-15).");
        return;
      }
      const today = new Date(); today.setHours(0,0,0,0);
      if (new Date(text.trim()) < today) {
        addMsg("assistant", "Travel date cannot be in the past. Please enter a future date.");
        return;
      }
      setBookingData((prev) => ({ ...prev, travelDate: text.trim() }));
      setBookingStep("confirm");
      addMsg("user", text);

      const updated = { ...bookingData, travelDate: text.trim() };
      const selectedRoute = routes.find((r) => r._id === updated.route);
      const total = updated.seats * (selectedRoute?.baseFare || 0);

      addMsg("assistant",
        `Here's your booking summary:\n\n` +
        `🛣️ Route: ${updated.routeLabel}\n` +
        `👤 Name: ${updated.passengerName}\n` +
        `📧 Email: ${updated.email}\n` +
        `📞 Phone: ${updated.phone}\n` +
        `💺 Seats: ${updated.seats}\n` +
        `📅 Date: ${updated.travelDate}\n` +
        `💰 Total: PKR ${total}\n\n` +
        `Type **confirm** to book or **cancel** to abort.`
      );
      return;
    }

    if (step === "confirm") {
      if (text.toLowerCase() === "cancel") {
        setBookingStep(null);
        setBooking(null);
        setBookingData({});
        addMsg("user", text);
        addMsg("assistant", "Booking cancelled. How else can I help you?");
        return;
      }
      if (text.toLowerCase() !== "confirm") {
        addMsg("assistant", 'Type **confirm** to proceed or **cancel** to abort.');
        return;
      }

      addMsg("user", text);
      setLoading(true);
      try {
        const payload = {
          route: bookingData.route,
          passengerName: bookingData.passengerName,
          email: bookingData.email,
          phone: bookingData.phone,
          seats: bookingData.seats,
          travelDate: bookingData.travelDate,
        };
        await axios.post(`${API}/bookings`, payload);
        addMsg("assistant", `🎉 Booking confirmed! Your seat on **${bookingData.routeLabel}** has been reserved. Check your email for details. Safe travels!`);
      } catch (err) {
        const msg = err.response?.data?.message || "Booking failed. Please try again.";
        addMsg("assistant", `❌ ${msg}`);
      } finally {
        setLoading(false);
        setBookingStep(null);
        setBooking(null);
        setBookingData({});
      }
      return;
    }
  };

  // ── Send message (AI chat or booking step) ──
  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    // If in booking flow, handle step
    if (bookingStep && bookingStep !== "route") {
      handleBookingStep(text);
      return;
    }

    // Check if user wants to book
    const bookTrigger = /\b(book|booking|reserve|ticket|seat)\b/i.test(text);
    if (bookTrigger && !bookingStep) {
      addMsg("user", text);
      await startBooking();
      return;
    }

    // Normal AI chat
    const userMsg = { role: "user", content: text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await axios.post(`${API}/chat`, {
        messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
      });
      addMsg("assistant", res.data.reply);
    } catch {
      addMsg("assistant", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ── Render message content (bold **text**) ──
  const renderContent = (content) => {
    const parts = content.split(/\*\*(.*?)\*\*/g);
    return parts.map((p, i) =>
      i % 2 === 1 ? <strong key={i}>{p}</strong> : p
    );
  };

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
                      <button
                        key={r._id}
                        className="chatbot-route-btn"
                        onClick={() => {
                          setInput(String(idx + 1));
                          setTimeout(() => {
                            handleBookingStep(String(idx + 1));
                            setInput("");
                          }, 0);
                        }}
                      >
                        <span className="route-num">{idx + 1}</span>
                        <span className="route-info">
                          <strong>{r.from} → {r.to}</strong>
                          <small>PKR {r.baseFare} · {r.availableSeats} seats · {r.duration}</small>
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
                <p className="chatbot-typing">
                  <span></span><span></span><span></span>
                </p>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="chatbot-input-area">
            <textarea
              rows={1}
              placeholder={
                bookingStep === "confirm"
                  ? "Type confirm or cancel..."
                  : bookingStep
                  ? "Type your answer..."
                  : "Ask anything or type 'book'..."
              }
              value={input}
              onChange={(e) => setInput(e.target.value)}
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
