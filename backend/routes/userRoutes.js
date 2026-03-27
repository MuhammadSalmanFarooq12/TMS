const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const User = require("../models/User");
const {
  register,
  login,
  getMe,
  myBookings,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Public
router.post("/register", register);
router.post("/login", login);

// Protected — attach user email for myBookings
router.get("/me", auth, getMe);
router.get("/my-bookings", auth, async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select("email");
    if (!user) return res.status(404).json({ message: "User not found" });
    req.userEmail = user.email;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}, myBookings);

// Admin
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
