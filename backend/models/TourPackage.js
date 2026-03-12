const mongoose = require("mongoose");

const tourPackageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    citiesIncluded: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "City",
      },
    ],

    durationDays: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
    },

    routeIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Route",
      },
    ],

    hotelIncluded: {
      type: Boolean,
      default: false,
    },

    mealsIncluded: {
      type: Boolean,
      default: false,
    },

    images: [String],

    startDates: [Date],

    maxSeats: {
      type: Number,
      required: true,
    },

    availableSeats: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TourPackage", tourPackageSchema);
