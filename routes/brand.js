const express = require("express");
const router = express.Router();

const {
  createOrUpdateBrands,
  list,
  remove,
  read,
  deleteMany,
  listAll,
} = require("../controller/brandsController");

const { authCheck, checkPermissions } = require("../middleware/auth");

// Private APIs
router.post(
  "/brands",
  authCheck,
  checkPermissions("canCreateOrUpdateBrand"),
  createOrUpdateBrands
);
router.get("/brands", authCheck, checkPermissions("canListBrands"), list);
router.delete(
  "/brand/:_id",
  authCheck,
  checkPermissions("canDeleteBrand"),
  remove
);
router.post(
  "/brands-delete-many",
  authCheck,
  checkPermissions("canDeleteMultiBrands"),
  deleteMany
);

// Public APIs
router.get("/brands-all", listAll);
router.get("/brand/:_id", read);

module.exports = router;
