const express = require("express");
const router = express.Router();

// controller
const {
  createOrUpdateSuperOffer,
  list,
  remove,
  read,
  deleteMany,
} = require("../controller/superOfferController");

// routes
router.post("/super-offer", createOrUpdateSuperOffer);
router.get("/super-offer", list);
router.delete("/super-offer/:_id", remove);
router.get("/super-offer/:_id", read);
router.post("/super-offer-delete-many", deleteMany);

module.exports = router;
