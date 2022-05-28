const express = require("express");
const router = express.Router();

const { authCheck, checkPermissions } = require("../middleware/auth");

const {
  createOrUpdateCategory,
  read,
  remove,
  list,
  listAll,
  getSubs,
  bulkCategory,
  deleteMany,
} = require("../controller/categoryController");

// Private APIs
router.post(
  "/category",
  authCheck,
  checkPermissions("canCreateOrUpdateCategory"),
  createOrUpdateCategory
);
router.get("/categories", authCheck, checkPermissions("canListCategory"), list);

router.delete(
  "/category/:slug",
  authCheck,
  checkPermissions("canDeleteCategory"),
  remove
);
router.post(
  "/bulk-category",
  authCheck,
  checkPermissions("canCreateBulkCategories"),
  bulkCategory
);
router.post(
  "/category-delete-many",
  authCheck,
  checkPermissions("canDeleteMultiCategories"),
  deleteMany
);
router.get("/category/get-sub/:_id", getSubs);

// Public APIs
router.get("/categories/list-all", listAll);
router.get("/category/:slug", read);

module.exports = router;
