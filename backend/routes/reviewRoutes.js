const express = require("express");
const router = express.Router();

const {
  createReview,
  getReviewsByBus,
  getAllReviews,
  deleteReview,
} = require("../controllers/reviewController");

router.post("/", createReview);

// Reviews of a specific bus
router.get("/bus/:busId", getReviewsByBus);

// Admin: all reviews
router.get("/", getAllReviews);

router.delete("/:id", deleteReview);

module.exports = router;
