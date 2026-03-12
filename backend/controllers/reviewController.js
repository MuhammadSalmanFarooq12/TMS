const Review = require("../models/Review");
const Bus = require("../models/Bus");

// CREATE review
exports.createReview = async (req, res) => {
  try {
    const { busId } = req.body;

    const busExists = await Bus.findById(busId);
    if (!busExists)
      return res.status(404).json({ message: "Bus not found" });

    const review = await Review.create(req.body);

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET reviews for a bus
exports.getReviewsByBus = async (req, res) => {
  try {
    const reviews = await Review.find({ busId: req.params.busId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all reviews (admin use)
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("busId")
      .populate("userId");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE review
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review)
      return res.status(404).json({ message: "Review not found" });

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
