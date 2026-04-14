const HotelBooking = require("../models/HotelBooking");
const Hotel = require("../models/Hotel");

exports.createHotelBooking = async (req, res) => {
  try {
    const { hotelId, guestName, email, phone, checkIn, checkOut, guests } = req.body;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    const nights = Math.max(
      1,
      Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    );
    const totalPrice = nights * hotel.pricePerNight * (guests || 1);

    const booking = await HotelBooking.create({
      hotelId,
      hotelTitle: hotel.title,
      hotelCity: hotel.city,
      guestName,
      email,
      phone,
      checkIn,
      checkOut,
      guests: guests || 1,
      totalPrice,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllHotelBookings = async (req, res) => {
  try {
    const bookings = await HotelBooking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteHotelBooking = async (req, res) => {
  try {
    await HotelBooking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
