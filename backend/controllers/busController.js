const Bus = require('../models/Bus');

// CREATE a new bus
const createBus = async (req, res) => {
  try {
    const {
      name,
      numberPlate,
      seats,
      route,
      departureTime,
      arrivalTime,
      price // ✅ get price from request body
    } = req.body;

    const newBus = new Bus({
      name,
      numberPlate,
      seats,
      route,
      departureTime,
      arrivalTime,
      price, // ✅ set price
      image: req.file ? `/uploads/${req.file.filename}` : null
    });

    const savedBus = await newBus.save();
    res.status(201).json(savedBus);

  } catch (error) {
    res.status(500).json({ message: 'Error creating bus', error: error.message });
  }
};

// GET all buses
const getAllBuses = async (req, res) => {
  try {
    const buses = await Bus.find();
    res.status(200).json(buses);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching buses', error: error.message });
  }
};

// GET single bus
const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.status(200).json(bus);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bus', error: error.message });
  }
};

// UPDATE bus
const updateBus = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedBus) {
      return res.status(404).json({ message: 'Bus not found' });
    }

    res.status(200).json(updatedBus);

  } catch (error) {
    res.status(500).json({ message: 'Error updating bus', error: error.message });
  }
};

// DELETE bus
const deleteBus = async (req, res) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(req.params.id);
    if (!deletedBus) return res.status(404).json({ message: 'Bus not found' });
    res.status(200).json({ message: 'Bus deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting bus', error: error.message });
  }
};

module.exports = {
  createBus,
  getAllBuses,
  getBusById,
  updateBus,
  deleteBus
};