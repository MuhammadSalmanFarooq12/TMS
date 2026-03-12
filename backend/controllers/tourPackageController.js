const TourPackage = require("../models/TourPackage");

// CREATE Package with images
exports.createPackage = async (req, res) => {
  try {
    const imageUrls = req.files
      ? req.files.map(
          (file) => `http://localhost:5000/uploads/${file.filename}`
        )
      : [];

    const packageData = await TourPackage.create({
      ...req.body,
      images: imageUrls,
    });

    res.status(201).json(packageData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET All Packages
exports.getAllPackages = async (req, res) => {
  try {
    const packages = await TourPackage.find()
      .populate("citiesIncluded")
      .populate("busId")
      .populate("routeIds");

    res.json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Package by ID
exports.getPackageById = async (req, res) => {
  try {
    const pkg = await TourPackage.findById(req.params.id)
      .populate("citiesIncluded")
      .populate("busId")
      .populate("routeIds");

    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json(pkg);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE Package (optional new images)
exports.updatePackage = async (req, res) => {
  try {
    let data = { ...req.body };

    if (req.files && req.files.length > 0) {
      data.images = req.files.map(
        (file) => `http://localhost:5000/uploads/${file.filename}`
      );
    }

    const updated = await TourPackage.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE Package
exports.deletePackage = async (req, res) => {
  try {
    const deleted = await TourPackage.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Package not found" });
    }

    res.json({ message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
