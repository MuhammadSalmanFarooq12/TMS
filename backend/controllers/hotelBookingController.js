const HotelBooking = require("../models/HotelBooking");
const Hotel = require("../models/Hotel");

exports.createHotelBooking = async (req, res) => {
  try {
    const { hotelId, guestName, email, phone, rooms, checkIn, checkOut } = req.body;

    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    const nights = Math.max(
      1,
      Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    );
    const totalPrice = rooms * nights * hotel.pricePerNight;

    const booking = await HotelBooking.create({
      hotel: hotelId, guestName, email, phone,
      rooms, checkIn, checkOut, totalPrice, status: "confirmed",
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllHotelBookings = async (req, res) => {
  try {
    const bookings = await HotelBooking.find()
      .populate("hotel", "title city pricePerNight")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getHotelBookingById = async (req, res) => {
  try {
    const booking = await HotelBooking.findById(req.params.id).populate("hotel", "title city pricePerNight");
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateHotelBooking = async (req, res) => {
  try {
    const updated = await HotelBooking.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Booking not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteHotelBooking = async (req, res) => {
  try {
    const deleted = await HotelBooking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Hotel booking deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
