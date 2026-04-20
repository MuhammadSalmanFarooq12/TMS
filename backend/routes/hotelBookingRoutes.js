const express = require("express");
const router = express.Router();
const {
  createHotelBooking,
  getAllHotelBookings,
  getHotelBookingById,
  updateHotelBooking,
  deleteHotelBooking,
} = require("../controllers/hotelBookingController");

router.post("/", createHotelBooking);
router.get("/", getAllHotelBookings);
router.get("/:id", getHotelBookingById);
router.put("/:id", updateHotelBooking);
router.delete("/:id", deleteHotelBooking);

module.exports = router;
