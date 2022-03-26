const express = require("express");
const router = express.Router();

// controller
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controller/subCategoryController");

// routes
router.post("/sub-category", create);
router.get("/sub-categories", list);
router.get("/sub-category/:slug", read);
router.put("/sub-category/:slug", update);
router.delete("/sub-category/:slug", remove);

module.exports = router;
