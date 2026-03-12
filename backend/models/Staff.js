const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    licenseNumber: {
      type: String,
      required: true,
      unique: true,
    },

    phone: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["driver", "conductor"],
      default: "driver",
    },

    assignedBusId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);
