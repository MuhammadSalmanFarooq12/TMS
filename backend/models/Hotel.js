const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
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

    address: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
    },

    pricePerNight: {
      type: Number,
      required: true,
    },

    amenities: [String], // e.g. ["Wifi", "Breakfast", "Parking"]

    images: [String],

    contactPhone: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
