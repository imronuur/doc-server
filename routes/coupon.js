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
router.delete("/coupon-code/:_id", remove);
router.post("/coupon-code-delete-many", deleteMany);
// router.post("/apply-coupon", applyCoupon);

module.exports = router;
