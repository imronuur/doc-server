const router = require("express").Router();
const { authCheck, checkPermissions } = require("../middleware/auth");

const {
  getClients,
  createOrUpdateClient,
  readClient,
  deleteClient,
  deleteMany,
  listAllClients,
} = require("../controller/clientController");

// Private APIs
router.get(
  "/clients",
  authCheck,
  checkPermissions("canListClients"),
  getClients
);
router.post(
  "/client",
  authCheck,
  checkPermissions("canCreateOrUpdateClient"),
  createOrUpdateClient
);
router.get(
  "/client/:_id",
  authCheck,
  checkPermissions("canSeeClientOrders"),
  readClient
);
router.delete(
  "/client/:_id",
  authCheck,
  checkPermissions("canDeleteClient"),
  deleteClient
);
router.post(
  "/client-delete-many",
  authCheck,
  checkPermissions("canDeleteMultiClients"),
  deleteMany
);
router.get(
  "/clients-all",
  authCheck,
  checkPermissions("canListClients"),
  listAllClients
);

module.exports = router;
