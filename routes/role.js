const router = require("express").Router();
const { authCheck, checkPermissions } = require("../middleware/auth");

const {
  getRoles,
  readRole,
  createOrUpdateRole,
  deleteRole,
  addRolePermission,
  getAllRoles,
} = require("../controller/roleController");

// Private APIs
router.get("/roles", authCheck, checkPermissions("canListRoles"), getRoles);
router.get(
  "/roles-list-all",
  authCheck,
  checkPermissions("canListAllRoles"),
  getAllRoles
);
router.post(
  "/roles",
  authCheck,
  checkPermissions("canCreateOrUpdateRole"),
  createOrUpdateRole
);
router.get("/roles/:_id", authCheck, checkPermissions("canReadRole"), readRole);
router.post(
  "/add-permissions-to-role/:_id",
  authCheck,
  checkPermissions("canCreateOrUpdateRole"),
  addRolePermission
);
router.delete(
  "/roles/:_id",
  authCheck,
  checkPermissions("canDeleteRole"),
  deleteRole
);

module.exports = router;
