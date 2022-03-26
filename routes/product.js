const express = require("express");
const router = express.Router();

// controller
const {
  create,
  listAll,
  remove,
  read,
  update,
} = require("../controller/productController");

// routes
router.post("/product", create);
router.get("/products/:count", listAll); 
router.delete("/product/:slug", remove);
router.get("/product/:slug", read);
router.put("/product/:slug", update);


module.exports = router;
