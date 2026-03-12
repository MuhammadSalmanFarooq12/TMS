// controllers/bookingController.js

const Booking = require("../models/Booking");
const Route = require("../models/Route");


// ==============================
// Fleet fare add-on per seat (in addition to route baseFare from Manage Routes)
const FLEET_FARE_ADDON = {
  Mercedes: 2000,
  Scania: 1000,
};

const getFleetAddon = (fleetName) => {
  if (!fleetName || typeof fleetName !== "string") return 0;
  const key = fleetName.trim();
  return FLEET_FARE_ADDON[key] ?? 0;
};

// CREATE a new booking
// ==============================
const createBooking = async (req, res) => {
  try {
    const { route, passengerName, email, phone, seats, travelDate, fleet } = req.body;

    // Check if route exists
    const existingRoute = await Route.findById(route);
    if (!existingRoute) {
      return res.status(404).json({ message: "Route not found" });
    }

    const availableSeats = existingRoute.availableSeats ?? 50;
    if (seats > availableSeats) {
      return res.status(400).json({
        message: `Only ${availableSeats} seats available`,
      });
    }

    // Base fare from Manage Routes + fleet addon (Mercedes +2000, Scania +1000 per seat)
    const farePerSeat = existingRoute.baseFare + getFleetAddon(fleet);
    const totalPrice = Math.round(seats * farePerSeat);

    const newBooking = new Booking({
      route,
      passengerName,
      email,
      phone,
      seats,
      travelDate,
      totalPrice,
      status: "confirmed",
      fleet: fleet || "",
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
      .populate("route", "from to duration baseFare availableSeats");

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
      .populate("route", "from to duration baseFare availableSeats");

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
    const { status, phone, fleet } = req.body;

    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { ...(status != null && { status }), ...(phone != null && { phone }), ...(fleet != null && { fleet }) },
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

    const route = await Route.findById(deletedBooking.route);
    if (route) {
      route.availableSeats = (route.availableSeats ?? 50) + deletedBooking.seats;
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