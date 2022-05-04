const express = require("express");
const router = express.Router();

// controller
const {
  createOrUpdateProduct,
  list,
  remove,
  read,
  deleteMany,
  bulkProduct,
  listAll,
} = require("../controller/productController");

// routes
router.post("/product", createOrUpdateProduct);
router.get("/products", list);
router.get("/get-all-products", listAll);
router.delete("/product/:slug", remove);
router.get("/product/:slug", read);
router.post("/bulk-product", bulkProduct);
router.post("/product-delete-many", deleteMany);

module.exports = router;
