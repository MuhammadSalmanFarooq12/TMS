const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity
} = require("../controllers/cityController");

// Memory storage for uploaded images
const upload = multer({ storage: multer.memoryStorage() });

// Routes with optional image upload (field name: images)
router.post("/", upload.single("images"), createCity);
router.get("/", getAllCities);
router.get("/:id", getCityById);
router.put("/:id", upload.single("images"), updateCity);
router.delete("/:id", deleteCity);

module.exports = router;
