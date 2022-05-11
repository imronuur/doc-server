const express = require("express");
const router = express.Router();

const { authCheck, checkPermissions } = require("../middleware/auth");

const {
  list,
  createOrUpdateCoupon,
  remove,
  deleteMany,
} = require("../controller/couponController");

// Private APIs
router.post(
  "/coupon-code",
  authCheck,
  checkPermissions("canCreateOrUpdateCoupon"),
  createOrUpdateCoupon
);
router.get("/coupon-code", authCheck, checkPermissions("canListCoupons"), list);
router.delete(
  "/coupon-code/:_id",
  authCheck,
  checkPermissions("canDeleteCoupon"),
  remove
);
router.post(
  "/coupon-code-delete-many",
  authCheck,
  checkPermissions("canDeleteMultiCoupons"),
  deleteMany
);
// router.post("/apply-coupon", applyCoupon);

module.exports = router;
