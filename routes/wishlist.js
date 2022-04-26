const router = require("express").Router();

const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controller/wishlistController");

const { authCheck } = require("../middleware/auth");

router.post("/wishlist", authCheck, addToWishlist);
router.get("/wishlists", authCheck, getWishlist);
router.put("/wishlist/:productId", authCheck, removeFromWishlist);

module.exports = router;
