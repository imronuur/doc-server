const router = require("express").Router();
const { authCheck } = require("../middleware/auth");

const {
  addItemToCart,
  getCart,
  emptyCart,
  saveUserCart,
  readUserCart,
} = require("../controller/cartController");

// User APIs
router.post("/cart/save", authCheck, saveUserCart);
router.post("/cart/get", authCheck, readUserCart);
router.post("/cart", authCheck, addItemToCart);
router.get("/cart", authCheck, getCart);
router.delete("/cart", authCheck, emptyCart);

module.exports = router;
