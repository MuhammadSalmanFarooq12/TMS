const express = require("express");
const router = express.Router();

const {
  createItinerary,
  getAllItineraries,
  getItineraryById,
  updateItinerary,
  deleteItinerary,
} = require("../controllers/itineraryController");

router.post("/", createItinerary);
router.get("/", getAllItineraries);
router.get("/:id", getItineraryById);
router.put("/:id", updateItinerary);
router.delete("/:id", deleteItinerary);

module.exports = router;
