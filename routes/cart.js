const router = require("express").Router();
const { authCheck } = require("../middleware/auth");

const {
  addItemToCart,
  getCart,
  emptyCart,
} = require("../controller/cartController");

router.post("/cart", authCheck, addItemToCart);
router.get("/cart", authCheck, getCart);
router.delete("/cart", authCheck, emptyCart);

module.exports = router;
