const router = require("express").Router();

const {
  addItemToCart,
  getCart,
  emptyCart,
} = require("../controller/cartController");

router.post("/cart", addItemToCart);
router.get("/cart", getCart);
router.delete("/cart", emptyCart);

module.exports = router;
