const Seat = require("../models/Seat");
const Bus = require("../models/Bus");

// CREATE seat
exports.createSeat = async (req, res) => {
  try {
    const { busId } = req.body;

    const busExists = await Bus.findById(busId);
    if (!busExists)
      return res.status(404).json({ message: "Bus not found" });

    const seat = await Seat.create(req.body);

    res.status(201).json(seat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all seats of a bus
exports.getSeatsByBus = async (req, res) => {
  try {
    const seats = await Seat.find({ busId: req.params.busId });
    res.json(seats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE seat
exports.updateSeat = async (req, res) => {
  try {
    const seat = await Seat.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!seat)
      return res.status(404).json({ message: "Seat not found" });

    res.json(seat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE seat
exports.deleteSeat = async (req, res) => {
  try {
    const seat = await Seat.findByIdAndDelete(req.params.id);

    if (!seat)
      return res.status(404).json({ message: "Seat not found" });

    res.json({ message: "Seat deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
