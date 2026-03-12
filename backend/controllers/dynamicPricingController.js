const DynamicPricing = require("../models/DynamicPricing");

// CREATE dynamic pricing
exports.createPricing = async (req, res) => {
  try {
    const pricing = await DynamicPricing.create(req.body);
    res.status(201).json(pricing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET all pricing
exports.getAllPricing = async (req, res) => {
  try {
    const pricing = await DynamicPricing.find()
      .populate("routeId")
      .populate("packageId");
    res.json(pricing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET pricing by ID
exports.getPricingById = async (req, res) => {
  try {
    const pricing = await DynamicPricing.findById(req.params.id)
      .populate("routeId")
      .populate("packageId");

    if (!pricing) return res.status(404).json({ message: "Pricing not found" });

    res.json(pricing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE pricing
exports.updatePricing = async (req, res) => {
  try {
    const updated = await DynamicPricing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Pricing not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE pricing
exports.deletePricing = async (req, res) => {
  try {
    const deleted = await DynamicPricing.findByIdAndDelete(req.params.id);

    if (!deleted) return res.status(404).json({ message: "Pricing not found" });

    res.json({ message: "Pricing deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
