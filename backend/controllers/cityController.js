const City = require("../models/City");

// CREATE city
exports.createCity = async (req, res) => {
  try {
    const city = await City.create({
      name: req.body.name,
      province: req.body.province,
      country: req.body.country,
      description: req.body.description,
      image: req.file
        ? { data: req.file.buffer, contentType: req.file.mimetype }
        : undefined
    });

    res.status(201).json(city);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "City already exists in this province" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// GET all cities
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find();

    // convert image buffer to base64 for each city
    const citiesWithImages = cities.map((city) => {
      const obj = city.toObject();
      if (obj.image && obj.image.data) {
        obj.image = `data:${obj.image.contentType};base64,${obj.image.data.toString("base64")}`;
      }
      return obj;
    });

    res.json(citiesWithImages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET city by ID
exports.getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) return res.status(404).json({ message: "City not found" });

    const obj = city.toObject();
    if (obj.image && obj.image.data) {
      obj.image = `data:${obj.image.contentType};base64,${obj.image.data.toString("base64")}`;
    }

    res.json(obj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE city
exports.updateCity = async (req, res) => {
  try {
    const updateData = {
      name: req.body.name,
      province: req.body.province,
      country: req.body.country,
      description: req.body.description
    };

    if (req.file) {
      updateData.image = { data: req.file.buffer, contentType: req.file.mimetype };
    }

    const city = await City.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });

    if (!city) return res.status(404).json({ message: "City not found" });

    res.json(city);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "City already exists in this province" });
    }
    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: error.message });
  }
};

// DELETE city
exports.deleteCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) return res.status(404).json({ message: "City not found" });

    res.json({ message: "City deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
