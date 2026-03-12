const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const {
  createPackage,
  getAllPackages,
  getPackageById,
  updatePackage,
  deletePackage,
} = require("../controllers/tourPackageController");

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/", upload.array("images", 5), createPackage);
router.get("/", getAllPackages);
router.get("/:id", getPackageById);
router.put("/:id", upload.array("images", 5), updatePackage);
router.delete("/:id", deletePackage);

module.exports = router;
