const Itinerary = require("../models/Itinerary");

// Create itinerary
exports.createItinerary = async (req, res) => {
  try {
    const itinerary = await Itinerary.create(req.body);
    res.status(201).json(itinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all itineraries
exports.getAllItineraries = async (req, res) => {
  try {
    const itineraries = await Itinerary.find()
      .populate("packageId")
      .populate("hotelId");

    res.json(itineraries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get itinerary by ID
exports.getItineraryById = async (req, res) => {
  try {
    const itinerary = await Itinerary.findById(req.params.id)
      .populate("packageId")
      .populate("hotelId");

    if (!itinerary) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.json(itinerary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update itinerary
exports.updateItinerary = async (req, res) => {
  try {
    const updated = await Itinerary.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete itinerary
exports.deleteItinerary = async (req, res) => {
  try {
    const deleted = await Itinerary.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Itinerary not found" });
    }

    res.json({ message: "Itinerary deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
