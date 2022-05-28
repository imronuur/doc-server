const express = require("express");
const router = express.Router();

const { authCheck, checkPermissions } = require("../middleware/auth");

const {
  createOrUpdateInvoice,
  list,
  remove,
  deleteMany,
} = require("../controller/invoiceController");

// Private APIs
router.post(
  "/invoices",
  authCheck,
  checkPermissions("canCreateOrUpdateInvoice"),
  createOrUpdateInvoice
);
router.get("/invoices", authCheck, checkPermissions("canListInvoices"), list);
router.delete(
  "/invoice/:_id",
  authCheck,
  checkPermissions("canDeleteInvoice"),
  remove
);
router.post(
  "/invoices-delete-many",
  authCheck,
  checkPermissions("canDeleteMultiInvoices"),
  deleteMany
);

module.exports = router;
