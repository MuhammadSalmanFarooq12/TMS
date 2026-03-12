const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    busId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // optional for now if users not built yet
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// One review per user per bus (when users exist)
reviewSchema.index({ busId: 1, userId: 1 }, { unique: true, sparse: true });

module.exports = mongoose.model("Review", reviewSchema);
