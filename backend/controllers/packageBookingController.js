const PackageBooking = require("../models/PackageBooking");
const TourPackage = require("../models/TourPackage");

// =====================
// CREATE
// =====================
const createPackageBooking = async (req, res) => {
  try {
    const { packageId, passengerName, email, phone, seats, travelDate } = req.body;

    const pkg = await TourPackage.findById(packageId);
    if (!pkg) return res.status(404).json({ message: "Package not found" });

    if (seats > pkg.maxSeats) {
      return res
        .status(400)
        .json({ message: `Only ${pkg.maxSeats} seats available` });
    }

    const totalPrice = seats * pkg.price;

    const booking = await PackageBooking.create({
      package: packageId,
      passengerName,
      email,
      phone,
      seats,
      travelDate,
      totalPrice,
      status: "confirmed",
    });

    pkg.maxSeats -= seats;
    await pkg.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================
// GET ALL
// =====================
const getAllPackageBookings = async (req, res) => {
  try {
    const bookings = await PackageBooking.find()
      .populate("package", "title price");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================
// GET ONE
// =====================
const getPackageBookingById = async (req, res) => {
  try {
    const booking = await PackageBooking.findById(req.params.id)
      .populate("package", "title price");

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================
// UPDATE
// =====================
const updatePackageBooking = async (req, res) => {
  try {
    const updated = await PackageBooking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Booking not found" });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// =====================
// DELETE
// =====================
const deletePackageBooking = async (req, res) => {
  try {
    const booking = await PackageBooking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    const pkg = await TourPackage.findById(booking.package);
    if (pkg) {
      pkg.maxSeats += booking.seats;
      await pkg.save();
    }

    await booking.deleteOne();

    res.json({ message: "Package booking deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPackageBooking,
  getAllPackageBookings,
  getPackageBookingById,
  updatePackageBooking,
  deletePackageBooking,
};