const express = require("express");
const router = express.Router();

const {
  createNotification,
  getAllNotifications,
  getNotificationById,
  updateNotification,
  deleteNotification,
} = require("../controllers/notificationController");

router.post("/", createNotification);
router.get("/", getAllNotifications);
router.get("/:id", getNotificationById);
router.put("/:id", updateNotification);
router.delete("/:id", deleteNotification);

module.exports = router;
