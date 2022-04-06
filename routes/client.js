const router = require("express").Router();
const {
  getClients,
  createOrUpdateClient,
  readClient,
  deleteClient,
  deleteMany,
} = require("../controller/clientController");

router.get("/clients", getClients);
router.post("/client", createOrUpdateClient);
router.get("/client/:_id", readClient);
router.delete("/client/:_id", deleteClient);
router.post("/client-delete-many", deleteMany);

module.exports = router;
