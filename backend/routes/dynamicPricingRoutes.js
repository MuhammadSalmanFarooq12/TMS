const express = require("express");
const router = express.Router();

const {
  createPricing,
  getAllPricing,
  getPricingById,
  updatePricing,
  deletePricing,
} = require("../controllers/dynamicPricingController");

router.post("/", createPricing);
router.get("/", getAllPricing);
router.get("/:id", getPricingById);
router.put("/:id", updatePricing);
router.delete("/:id", deletePricing);

module.exports = router;
