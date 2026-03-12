const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema(
  {
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },

    seatNumber: {
      type: String, // "A1", "B3"
      required: true,
    },

    class: {
      type: String,
      enum: ["economy", "business"],
      default: "economy",
    },

    isWindow: {
      type: Boolean,
      default: false,
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// One seat number per bus
seatSchema.index({ busId: 1, seatNumber: 1 }, { unique: true });

module.exports = mongoose.model("Seat", seatSchema);
