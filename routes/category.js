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
router.get("/category/subs/:_id", getSubs);
router.post("/bulk-category", bulkCategory);
router.post("/category-delete-many", deleteMany);

module.exports = router;
