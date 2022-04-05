const express = require("express");
const router = express.Router();

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

router.post("/category", createOrUpdateCategory);
router.get("/categories", list);
router.get("/categories/list-all", listAll);
router.get("/category/:slug", read);
router.delete("/category/:slug", remove);
router.post("/bulk-category", bulkCategory);
router.post("/category-delete-many", deleteMany);
router.get("/category/get-sub/:_id", getSubs);

module.exports = router;
