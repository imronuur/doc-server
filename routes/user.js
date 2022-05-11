const router = require("express").Router();

const {
  getUsers,
  readUser,
  createOrUpdateUser,
  deleteUser,
  loginUser,
  saveAddress,
  adminAddUser,
  deleteMany,
} = require("../controller/userController");

const {
  authCheck,
  tokenCheck,
  checkPermissions,
} = require("../middleware/auth");

// User APIs
router.post("/users", authCheck, createOrUpdateUser);

// Admin APIs
router.get("/users", authCheck, checkPermissions("canListUsers"), getUsers);
router.delete(
  "/users/:_id",
  authCheck,
  checkPermissions("canDeleteUser"),
  authCheck,
  deleteUser
);
router.post(
  "/admin-add-user",
  authCheck,
  checkPermissions("canCreateOrUpdateUser"),
  authCheck,
  adminAddUser
);

// Shared APIs
router.post("/login-user", authCheck, loginUser);
router.post("/users/token-check", tokenCheck);
router.post("/users/address", authCheck, saveAddress);
router.get("/users/:_id", readUser);

module.exports = router;
