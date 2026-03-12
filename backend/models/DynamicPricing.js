const mongoose = require("mongoose");

const dynamicPricingSchema = new mongoose.Schema(
  {
    routeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourPackage",
    },
    date: {
      type: Date,
      required: true,
    },
    multiplier: {
      type: Number,
      required: true,
      default: 1.0, // 1 means normal price
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("DynamicPricing", dynamicPricingSchema);
