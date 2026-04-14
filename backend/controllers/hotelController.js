const Hotel = require("../models/Hotel");

exports.createHotel = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = "/uploads/" + req.file.filename;
    const hotel = await Hotel.create(data);
    res.status(201).json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllHotels = async (req, res) => {
  try {
    const { city } = req.query;
    const query = city ? { city } : {};
    const hotels = await Hotel.find(query);
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateHotel = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = "/uploads/" + req.file.filename;
    const updated = await Hotel.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!updated) return res.status(404).json({ message: "Hotel not found" });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteHotel = async (req, res) => {
  try {
    const deleted = await Hotel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Hotel not found" });
    res.json({ message: "Hotel deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
