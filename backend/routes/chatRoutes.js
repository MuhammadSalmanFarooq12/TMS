const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");
const Route = require("../models/Route");

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are a helpful customer support assistant for FastIntercity (also known as Bookkaru), a Tourism Management System based in Pakistan.

About the platform:
- FastIntercity / Bookkaru is an online bus and travel booking platform operating in Pakistan.
- Users can browse bus routes, book seats, explore tour packages, view fleet details, and discover cities.
- Fleet types: Mercedes (premium, +PKR 2000/seat), Scania (standard, +PKR 1000/seat), Volvo.
- Popular destinations include Murree, Hunza, Skardu, Azad Kashmir, Kalar Kahar, Malam Jabba.
- Payment methods accepted: Visa, MasterCard, JazzCash, Easypaisa.
- Bookings require: passenger name, email, phone, number of seats, travel date.
- Users should arrive at least 30 minutes before departure.
- Cancellations are possible before the travel date by contacting support.
- Refunds follow the platform refund policy.
- Standard luggage is allowed; extra baggage may cost extra.
- Tour packages available: City Tours, Northern Pakistan Tours, Weekend Getaways.
- Website pages: Home, Routes, Cities, Fleet, Packages, About, Booking, FAQs, Contact.

Rules:
- Only answer questions related to FastIntercity / Bookkaru services, travel in Pakistan, bookings, routes, fleet, packages, cities, payments, and policies.
- If asked about anything unrelated, politely say you can only help with travel and booking queries on this platform.
- Be concise, friendly, and helpful.
- Always respond in the same language the user writes in (Urdu or English).`;

// POST /api/chat  — general AI chat
router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages))
      return res.status(400).json({ message: "messages array is required" });

    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 512,
      temperature: 0.7,
    });

    const reply =
      completion.choices[0]?.message?.content ||
      "Sorry, I could not get a response.";
    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ message: "Chat error", error: error.message });
  }
});

// GET /api/chat/routes  — fetch all routes for booking flow
router.get("/routes", async (req, res) => {
  try {
    const routes = await Route.find({}, "from to baseFare availableSeats distanceKm duration");
    res.status(200).json(routes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching routes", error: error.message });
  }
});

module.exports = router;
