const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema(
  {
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TourPackage",
      required: true,
    },

    dayNumber: {
      type: Number,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    activities: [String],

    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
    },

    mealsProvided: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Itinerary", itinerarySchema);
