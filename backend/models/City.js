const mongoose = require("mongoose");

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    province: { type: String, required: true, trim: true },
    country: { type: String, required: true, default: "Pakistan" },
    description: { type: String, trim: true },

    // Image stored as Buffer + contentType
    image: {
      data: Buffer,
      contentType: String
    }
  },
  { timestamps: true }
);

// Ensure unique city per province
citySchema.index({ name: 1, province: 1 }, { unique: true });

module.exports = mongoose.model("City", citySchema);
