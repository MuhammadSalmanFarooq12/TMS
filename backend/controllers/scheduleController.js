const Schedule = require("../models/Schedule");
const Bus = require("../models/Bus");
const Route = require("../models/Route");

// CREATE schedule
exports.createSchedule = async (req, res) => {
  try {
    const { busId, routeId } = req.body;

    // Validate bus & route
    const busExists = await Bus.findById(busId);
    const routeExists = await Route.findById(routeId);

    if (!busExists)
      return res.status(404).json({ message: "Bus not found" });

    if (!routeExists)
      return res.status(404).json({ message: "Route not found" });

    const schedule = await Schedule.create(req.body);

    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all schedules
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate("busId")
      .populate("routeId");

    res.json(schedules);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET schedule by ID
exports.getScheduleById = async (req, res) => {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate("busId")
      .populate("routeId");

    if (!schedule)
      return res.status(404).json({ message: "Schedule not found" });

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE schedule
exports.updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!schedule)
      return res.status(404).json({ message: "Schedule not found" });

    res.json(schedule);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE schedule
exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);

    if (!schedule)
      return res.status(404).json({ message: "Schedule not found" });

    res.json({ message: "Schedule deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
