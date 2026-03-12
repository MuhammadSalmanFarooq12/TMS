const Staff = require("../models/Staff");
const Bus = require("../models/Bus");

// CREATE staff
exports.createStaff = async (req, res) => {
  try {
    const { assignedBusId } = req.body;

    if (assignedBusId) {
      const busExists = await Bus.findById(assignedBusId);
      if (!busExists)
        return res.status(404).json({ message: "Assigned bus not found" });
    }

    const staff = await Staff.create(req.body);
    res.status(201).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET all staff
exports.getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find().populate("assignedBusId");
    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET staff by ID
exports.getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id).populate(
      "assignedBusId"
    );

    if (!staff)
      return res.status(404).json({ message: "Staff not found" });

    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE staff
exports.updateStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!staff)
      return res.status(404).json({ message: "Staff not found" });

    res.json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE staff
exports.deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);

    if (!staff)
      return res.status(404).json({ message: "Staff not found" });

    res.json({ message: "Staff deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
