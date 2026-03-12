const express = require("express");
const router = express.Router();

const controller = require("../controllers/packageBookingController");

router.post("/", controller.createPackageBooking);
router.get("/", controller.getAllPackageBookings);
router.get("/:id", controller.getPackageBookingById);
router.put("/:id", controller.updatePackageBooking);
router.delete("/:id", controller.deletePackageBooking);

module.exports = router;