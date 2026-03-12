// routes/busBookingRoutes.js
const express = require("express");
const router = express.Router();
const {
  createBusBooking,
  getAllBusBookings,
  getBusBookingById,
  updateBusBooking,
  deleteBusBooking,
} = require("../controllers/busBookingController");

// Routes
router.post("/", createBusBooking);
router.get("/", getAllBusBookings);
router.get("/:id", getBusBookingById);
router.put("/:id", updateBusBooking);
router.delete("/:id", deleteBusBooking);

module.exports = router;