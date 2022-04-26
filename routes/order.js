const router = require("express").Router();

const {
  createOrder,
  listAllOrders,
  getUserOrders,
  updateOrderStatus,
} = require("../controller/orderController");

const { authCheck } = require("../middleware/auth");

router.post("/order", authCheck, createOrder);
// router.post("/cash-order", authCheck, createCashOrder);
router.get("/orders", authCheck, listAllOrders);
router.get("/my-orders", authCheck, getUserOrders);
router.post("/update-order-status", authCheck, updateOrderStatus);

module.exports = router;
