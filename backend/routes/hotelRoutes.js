const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");

const {
  createHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

router.post("/", upload.single("image"), createHotel);
router.get("/", getAllHotels);
router.get("/:id", getHotelById);
router.put("/:id", upload.single("image"), updateHotel);
router.delete("/:id", deleteHotel);

module.exports = router;
