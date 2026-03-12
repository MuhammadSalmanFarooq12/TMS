const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  name: { type: String, required: true },
  numberPlate: { type: String, required: true, unique: true },
  seats: { type: Number, required: true },
  route: { type: String, required: true },
  departureTime: { type: String, required: true },
  arrivalTime: { type: String, required: true },

  // ✅ new fields
  image: { type: String },
  price: { type: Number, required: true } // Added price
}, { timestamps: true });

module.exports = mongoose.model('Bus', busSchema);