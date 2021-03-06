const router = require("express").Router();

const {
  getUsers,
  createOrUpdateUser,
  deleteUser,
  loginUser,
  addAddress,
  getAddress,
  removeAddress,
  adminAddUser,
  createUserProfile,
} = require("../controller/userController");

const {
  authCheck,
  tokenCheck,
  checkPermissions,
} = require("../middleware/auth");

// User APIs
router.post("/users", authCheck, createOrUpdateUser);
router.post("/user-profile", authCheck, createUserProfile);

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
router.post("/users/add-address", authCheck, addAddress);
router.get("/users/get-address", authCheck, getAddress);
router.post("/users/remove-address", authCheck, removeAddress);

module.exports = router;
