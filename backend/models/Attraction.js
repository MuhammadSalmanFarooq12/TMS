const mongoose = require("mongoose");

const attractionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    cityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    entryFee: {
      type: Number,
      default: 0,
    },

    openingHours: {
      type: String, // e.g. "9:00 AM - 6:00 PM"
    },

    images: [String],

    locationMapLink: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Attraction", attractionSchema);
