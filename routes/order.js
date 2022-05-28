const router = require("express").Router();

const {
  createOrder,
  listAllOrders,
  getUserOrders,
  updateOrderStatus,
  remove,
  deleteMany,
  readUserOrder,
} = require("../controller/orderController");

const { authCheck, checkPermissions } = require("../middleware/auth");

// User APIs
router.post("/order", authCheck, createOrder);
router.post("/user-orders", authCheck, getUserOrders);
router.get("/user-orders/:_id", authCheck, readUserOrder);

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
