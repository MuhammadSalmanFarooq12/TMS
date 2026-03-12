const express = require("express");
const router = express.Router();

const {
  createAttraction,
  getAllAttractions,
  getAttractionById,
  updateAttraction,
  deleteAttraction,
} = require("../controllers/attractionController");

router.post("/", createAttraction);
router.get("/", getAllAttractions);
router.get("/:id", getAttractionById);
router.put("/:id", updateAttraction);
router.delete("/:id", deleteAttraction);

module.exports = router;
