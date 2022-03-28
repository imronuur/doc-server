const express = require("express");
const router = express.Router();

// controller
const {
  createOrUpdateSubCategory,
  read,
  update,
  remove,
  list,
  deleteMany,
} = require("../controller/subCategoryController");

// routes
router.post("/sub-category", createOrUpdateSubCategory);
router.get("/sub-categories", list);
router.get("/sub-category/:slug", read);
router.put("/sub-category/:slug", update);
router.delete("/sub-category/:slug", remove);
router.post("/sub-category-delete-many", deleteMany);

module.exports = router;
