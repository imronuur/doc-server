const router = require("express").Router();

const {
  getRoles,
  readRole,
  createOrUpdateRole,
  deleteRole,
  addRolePermission,
} = require("../controller/roleController");

router.get("/roles", getRoles);
router.post("/roles", createOrUpdateRole);
router.get("/roles/:_id", readRole);
router.post("/add-permissions-to-role/:_id", addRolePermission);
router.delete("/roles/:_id", deleteRole);

module.exports = router;
