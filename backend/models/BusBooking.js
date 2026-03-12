// models/BusBooking.js
const mongoose = require("mongoose");

const busBookingSchema = new mongoose.Schema(
  {
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },

    passengerName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {                 // ✅ added phone
      type: String,
      required: true,
    },

    seats: {
      type: Number,
      required: true,
    },

    travelDate: {
      type: Date,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BusBooking", busBookingSchema);