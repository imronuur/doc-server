const express = require("express");
const router = express.Router();
const { authCheck, checkPermissions } = require("../middleware/auth");

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

// Private APIs
router.post(
  "/product",
  authCheck,
  checkPermissions("canCreateOrUpdateProduct"),
  createOrUpdateProduct
);

router.delete(
  "/product/:slug",
  authCheck,
  checkPermissions("canDeleteProduct"),
  remove
);

router.post(
  "/bulk-product",
  authCheck,
  checkPermissions("canCreateBulkProducts"),
  bulkProduct
);
router.post(
  "/product-delete-many",
  authCheck,
  checkPermissions("canDeleteMultiProducts"),
  deleteMany
);

// User APIs
router.post("/rate-product/:_id", authCheck, productRating);

// Public APIs
router.get("/products", list);
router.get("/get-all-products", listAll);
router.get("/product/:_id", read);
router.get("/highest-discouted-products", listHighDiscountProducts);
router.get("/newest-products", listNewestProducts);
router.get("/top-rated-products", listTopRatedProducts);

module.exports = router;
