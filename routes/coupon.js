const express = require("express");
const router = express.Router();

// controller
const {
  list,
  createOrUpdateCoupon,
} = require("../controller/couponController");

// routes
router.post("/coupon-code", createOrUpdateCoupon);
router.get("/coupon-code", list);

module.exports = router;
