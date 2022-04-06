const express = require("express");
const router = express.Router();

// controller
const {
  list,
  createOrUpdateCoupon,
  remove,
  deleteMany,
} = require("../controller/couponController");

// routes
router.post("/coupon-code", createOrUpdateCoupon);
router.get("/coupon-code", list);
router.delete("/coupon-code", remove);
router.post("/coupon-code-delete-many", deleteMany);

module.exports = router;
