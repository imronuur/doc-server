const express = require("express");
const router = express.Router();

const { authCheck, checkPermissions } = require("../middleware/auth");

const {
  createOrUpdateSubCategory,
  read,
  remove,
  list,
  deleteMany,
  listAll,
} = require("../controller/subCategoryController");

// Private APIs
router.post(
  "/sub-category",
  authCheck,
  checkPermissions("canCreateOrUpdateSubCategory"),
  createOrUpdateSubCategory
);
router.delete(
  "/sub-category/:slug",
  authCheck,
  checkPermissions("canDeleteSubCategories"),
  remove
);
router.post(
  "/sub-category-delete-many",
  authCheck,
  checkPermissions("canDeleteMultiSubCategories"),
  deleteMany
);

// Public APIs
router.get("/sub-categories", list);
router.get("/sub-categories/list-all", listAll);
router.get("/sub-category/:slug", read);

module.exports = router;
