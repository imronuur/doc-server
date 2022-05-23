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
  listRelated,
  handleNameSearch,
  handleCategory,
  handlePrice,
  handleStar,
  handleSub,
  handleBrand,
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
router.get("/get-related-products/:_id", listRelated);
router.get("/product/:_id", read);
router.get("/highest-discouted-products", listHighDiscountProducts);
router.get("/newest-products", listNewestProducts);
router.get("/top-rated-products", listTopRatedProducts);

// router.post("/products/search", searchFilters);
router.post("/filter-products-by-name", handleNameSearch);
router.post("/filter-products-by-category/", handleCategory);
router.post("/filter-products-by-sub-category/", handleSub);
router.get("/filter-products-by-price/", handlePrice);
router.post("/filter-products-by-brand", handleBrand);
router.get("/filter-products-by-rating/:star", handleStar);

module.exports = router;
