const express = require("express");
const router = express.Router();

const {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");

router.post("/", createHotel);
router.get("/", getAllHotels);
router.get("/:id", getHotelById);
router.put("/:id", updateHotel);
router.delete("/:id", deleteHotel);

module.exports = router;
