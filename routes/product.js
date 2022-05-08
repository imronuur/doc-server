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
  listHighDiscountProducts,
  listNewestProducts,
  listTopRatedProducts,
  productRating,
} = require("../controller/productController");

// routes
router.post("/product", createOrUpdateProduct);
router.get("/products", list);
router.get("/get-all-products", listAll);
router.delete("/product/:slug", remove);
router.get("/product/:_id", read);
router.post("/rate-product/:_id", productRating);

router.post("/bulk-product", bulkProduct);
router.post("/product-delete-many", deleteMany);
router.get("/highest-discouted-products", listHighDiscountProducts);
router.get("/newest-products", listNewestProducts);
router.get("/top-rated-products", listTopRatedProducts);

module.exports = router;
