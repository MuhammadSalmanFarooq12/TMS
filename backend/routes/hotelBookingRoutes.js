const express = require("express");
const router = express.Router();
const { createHotelBooking, getAllHotelBookings, deleteHotelBooking } = require("../controllers/hotelBookingController");

router.post("/", createHotelBooking);
router.get("/", getAllHotelBookings);
router.delete("/:id", deleteHotelBooking);

module.exports = router;
