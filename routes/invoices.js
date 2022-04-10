const express = require("express");
const router = express.Router();

// controller
const {
  createOrUpdateInvoice,
  list,
} = require("../controller/invoiceController");

// routes
router.post("/invoices", createOrUpdateInvoice);
router.get("/invoices", list);

module.exports = router;
