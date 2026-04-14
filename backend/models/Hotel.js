const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    city: {
      type: String,
      required: true,
      enum: ["Kashmir", "Skardu", "Malam Jabba", "Murree"],
    },
    pricePerNight: { type: Number, required: true },
    rooms: { type: String, default: "1" },
    bathrooms: { type: String, default: "1" },
    sofas: { type: String, default: "0" },
    balconies: { type: String, default: "0" },
    ac: { type: Boolean, default: false },
    wifi: { type: Boolean, default: false },
    roomHeater: { type: Boolean, default: false },
    led: { type: Boolean, default: false },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
