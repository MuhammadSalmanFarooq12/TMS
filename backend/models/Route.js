const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
      trim: true,
    },

    to: {
      type: String,
      required: true,
      trim: true,
    },

    distanceKm: {
      type: Number,
      required: true,
    },

    duration: {
      type: String, // e.g. "5h 30m"
      required: true,
    },

    baseFare: {
      type: Number,
      required: true,
    },

    image: {
      type: String, // URL to the uploaded image
      required: true,
    },
    availableSeats: {
      type: Number,
      default: 50,
    },
  },
  { timestamps: true }
);

// ✅ unique combination of from + to
routeSchema.index({ from: 1, to: 1 }, { unique: true });

module.exports = mongoose.model("Route", routeSchema);