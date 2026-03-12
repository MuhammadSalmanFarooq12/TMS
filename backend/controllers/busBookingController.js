// controllers/busBookingController.js
const BusBooking = require("../models/BusBooking");
const Bus = require("../models/Bus");

// CREATE
const createBusBooking = async (req, res) => {
  try {
    const { busId, passengerName, email, phone, seats, travelDate } = req.body;

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found" });
    if (!bus.price) return res.status(400).json({ message: "Bus price not set" });

    const totalPrice = Number(seats) * bus.price;

    const booking = await BusBooking.create({
      bus: busId,
      passengerName,
      email,
      phone,                // ✅ include phone
      seats,
      travelDate,
      totalPrice,
      status: "confirmed",
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
const getAllBusBookings = async (req, res) => {
  try {
    const bookings = await BusBooking.find().populate(
      "bus",
      "name numberPlate price"
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ONE
const getBusBookingById = async (req, res) => {
  try {
    const booking = await BusBooking.findById(req.params.id).populate(
      "bus",
      "name numberPlate price"
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
const updateBusBooking = async (req, res) => {
  try {
    const updated = await BusBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Booking not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
const deleteBusBooking = async (req, res) => {
  try {
    const booking = await BusBooking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Bus booking deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBusBooking,
  getAllBusBookings,
  getBusBookingById,
  updateBusBooking,
  deleteBusBooking,
};