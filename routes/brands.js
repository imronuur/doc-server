const express = require("express");
const router = express.Router();

// controller
const {
  createOrUpdateBrands,
  list,
  remove,
  read,
  deleteMany,
} = require("../controller/brandsController");

// routes
router.post("/brands", createOrUpdateBrands);
router.get("/brands", list);
router.delete("/brand/:_id", remove);
router.get("/brand/:_id", read);
router.post("/brands-delete-many", deleteMany);

module.exports = router;
