const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getTopRoutes,
  getPopularPackages,
  getOccupancyRate,
} = require("../controllers/reportController");

router.get("/dashboard", getDashboardStats);
router.get("/top-routes", getTopRoutes);
router.get("/popular-packages", getPopularPackages);
router.get("/occupancy-rate", getOccupancyRate);

module.exports = router;
