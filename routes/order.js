const router = require("express").Router();

const {
  createOrder,
  listAllOrders,
  getUserOrders,
  updateOrderStatus,
  remove,
  deleteMany,
} = require("../controller/orderController");

const { authCheck, checkPermissions } = require("../middleware/auth");

// User APIs
router.post("/order", authCheck, createOrder);
router.get("/my-orders", authCheck, getUserOrders);
// router.post("/cash-order", authCheck, createCashOrder);

// Private APIs
router.get(
  "/orders",
  authCheck,
  checkPermissions("canListAllOrders"),
  listAllOrders
);
router.post(
  "/update-order-status",
  authCheck,
  checkPermissions("canUpdateOrderStatus"),
  updateOrderStatus
);
router.delete(
  "/order/:_id",
  authCheck,
  checkPermissions("canDeleteOrder"),
  remove
);
router.post(
  "/orders-delete-many",
  authCheck,
  checkPermissions("canDeleteMultiOrders"),
  deleteMany
);

module.exports = router;
