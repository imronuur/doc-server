const router = require("express").Router();
const {
  getServices,
  readService,
  createOrUpdateService,
  deleteService,
  sendEmail,
} = require("../controller/serviceController");

router.get("/services", getServices);
router.post("/services", createOrUpdateService);
router.get("/services/:_id", readService);
router.delete("/services/:_id", deleteService);
router.post("/send-email", sendEmail);

module.exports = router;
