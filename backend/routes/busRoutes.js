const express = require("express");
const router = express.Router();
const busController = require("../controllers/busController");
const upload = require("../middlewares/upload");

// Create a new bus with image
router.post("/", upload.single("image"), busController.createBus);

// Get all buses
router.get("/", busController.getAllBuses);

// Get a bus by ID
router.get("/:id", busController.getBusById);

// Update a bus (optional new image)
router.put("/:id", upload.single("image"), busController.updateBus);

// Delete a bus
router.delete("/:id", busController.deleteBus);

module.exports = router;