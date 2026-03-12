const Attraction = require("../models/Attraction");

// Create attraction
exports.createAttraction = async (req, res) => {
  try {
    const attraction = await Attraction.create(req.body);
    res.status(201).json(attraction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all attractions
exports.getAllAttractions = async (req, res) => {
  try {
    const attractions = await Attraction.find().populate("cityId");
    res.json(attractions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get attraction by ID
exports.getAttractionById = async (req, res) => {
  try {
    const attraction = await Attraction.findById(req.params.id).populate(
      "cityId"
    );

    if (!attraction) {
      return res.status(404).json({ message: "Attraction not found" });
    }

    res.json(attraction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update attraction
exports.updateAttraction = async (req, res) => {
  try {
    const updated = await Attraction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Attraction not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete attraction
exports.deleteAttraction = async (req, res) => {
  try {
    const deleted = await Attraction.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Attraction not found" });
    }

    res.json({ message: "Attraction deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
