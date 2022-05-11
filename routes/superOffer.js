const express = require("express");
const router = express.Router();

const { authCheck, checkPermissions } = require("../middleware/auth");

const {
  createOrUpdateSuperOffer,
  list,
  remove,
  read,
  deleteMany,
} = require("../controller/superOfferController");

// Private APIs
router.post(
  "/super-offer",
  authCheck,
  checkPermissions("canCreateOrUpdateOffer"),
  createOrUpdateSuperOffer
);
router.delete(
  "/super-offer/:_id",
  authCheck,
  checkPermissions("canDeleteOffer"),
  remove
);
router.post(
  "/super-offer-delete-many",
  authCheck,
  checkPermissions("canDeleteMultiOffers"),
  deleteMany
);

// Public APIs
router.get("/super-offer/:_id", read);
router.get("/super-offer", list);

module.exports = router;
