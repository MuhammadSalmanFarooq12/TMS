const express = require("express");
const router = express.Router();
const routeController = require("../controllers/routeController");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

router.get("/", routeController.getAllRoutes);

router.get("/:id", routeController.getRouteById);

router.post("/", upload.single("image"), routeController.createRoute);

module.exports = router;