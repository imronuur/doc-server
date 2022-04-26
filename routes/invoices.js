const express = require("express");
const router = express.Router();

// controller
const {
  createOrUpdateInvoice,
  list,
  remove,
  deleteMany,
} = require("../controller/invoiceController");

// routes
router.post("/invoices", createOrUpdateInvoice);
router.get("/invoices", list);
router.delete("/invoice/:_id", remove);
router.post("/invoices-delete-many", deleteMany);

module.exports = router;
