const express = require("express");
const router = express.Router();

const {
  createSeat,
  getSeatsByBus,
  updateSeat,
  deleteSeat,
} = require("../controllers/seatController");

// Add seat
router.post("/", createSeat);

// Get seats for a bus
router.get("/bus/:busId", getSeatsByBus);

// Update seat
router.put("/:id", updateSeat);

// Delete seat
router.delete("/:id", deleteSeat);

module.exports = router;
