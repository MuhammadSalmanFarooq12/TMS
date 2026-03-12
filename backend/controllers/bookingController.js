// controllers/bookingController.js

const Booking = require("../models/Booking");
const Route = require("../models/Route");


// ==============================
// CREATE a new booking
// ==============================
const createBooking = async (req, res) => {
  try {
    const { route, passengerName, email, phone, seats, travelDate } = req.body; // ✅ added phone

    // Check if route exists
    const existingRoute = await Route.findById(route);
    if (!existingRoute) {
      return res.status(404).json({ message: "Route not found" });
    }

    // Check seat availability
    if (seats > existingRoute.availableSeats) {
      return res.status(400).json({
        message: `Only ${existingRoute.availableSeats} seats available`,
      });
    }

    // Calculate total price dynamically
    const totalPrice = seats * existingRoute.baseFare;

    const newBooking = new Booking({
      route,
      passengerName,
      email,
      phone,           // ✅ save phone
      seats,
      travelDate,
      totalPrice,
      status: "confirmed",
    });

    const savedBooking = await newBooking.save();

    // Reduce available seats
    existingRoute.availableSeats -= seats;
    await existingRoute.save();

    res.status(201).json(savedBooking);

  } catch (error) {
    res.status(500).json({
      message: "Error creating booking",
      error: error.message,
    });
  }
};


// ==============================
// GET all bookings
// ==============================
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("route", "from to duration baseFare");

    res.status(200).json(bookings);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching bookings",
      error: error.message,
    });
  }
};


// ==============================
// GET single booking by ID
// ==============================
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("route", "from to duration baseFare");

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    res.status(200).json(booking);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching booking",
      error: error.message,
    });
  }
};


// ==============================
// UPDATE booking status (and phone)
// ==============================
const updateBooking = async (req, res) => {
  try {
    const { status, phone } = req.body; // ✅ added phone update

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status, phone },  // ✅ update phone
      { new: true }
    );

    if (!updatedBooking)
      return res.status(404).json({ message: "Booking not found" });

    res.status(200).json(updatedBooking);

  } catch (error) {
    res.status(500).json({
      message: "Error updating booking",
      error: error.message,
    });
  }
};


// ==============================
// DELETE booking
// ==============================
const deleteBooking = async (req, res) => {
  try {
    const deletedBooking = await Booking.findById(req.params.id);

    if (!deletedBooking)
      return res.status(404).json({ message: "Booking not found" });

    // Restore seats when booking deleted
    const route = await Route.findById(deletedBooking.route);
    if (route) {
      route.availableSeats += deletedBooking.seats;
      await route.save();
    }

    await deletedBooking.deleteOne();

    res.status(200).json({ message: "Booking deleted successfully" });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting booking",
      error: error.message,
    });
  }
};


module.exports = {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
};