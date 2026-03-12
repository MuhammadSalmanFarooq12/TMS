const express = require("express");
const router = express.Router();

const {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  deleteInvoice,
} = require("../controllers/invoiceController");

router.post("/", createInvoice);
router.get("/", getAllInvoices);
router.get("/:id", getInvoiceById);
router.delete("/:id", deleteInvoice);

module.exports = router;
