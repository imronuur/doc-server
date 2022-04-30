const router = require("express").Router();

const {
  createOrder,
  listAllOrders,
  getUserOrders,
  updateOrderStatus,
  remove,
  deleteMany,
} = require("../controller/orderController");

const { authCheck } = require("../middleware/auth");

router.post("/order", createOrder);
// router.post("/cash-order", authCheck, createCashOrder);
router.get("/orders", listAllOrders);
router.get("/my-orders", authCheck, getUserOrders);
router.post("/update-order-status", updateOrderStatus);
router.delete("/order/:_id", remove);
router.post("/orders-delete-many", deleteMany);

module.exports = router;
