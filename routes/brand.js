const express = require("express");
const router = express.Router();

// controller
const {
  createOrUpdateBrands,
  list,
  remove,
  read,
  deleteMany,
  listAll,
} = require("../controller/brandsController");

// routes
router.post("/brands", createOrUpdateBrands);
router.get("/brands", list);
router.get("/brands-all", listAll);
router.delete("/brand/:_id", remove);
router.get("/brand/:_id", read);
router.post("/brands-delete-many", deleteMany);

module.exports = router;
