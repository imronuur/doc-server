const router = require("express").Router();

const {
  getUsers,
  readUser,
  createOrUpdateUser,
  deleteUser,
  loginUser,
  saveAddress,
} = require("../controller/userController");

const { authCheck } = require("../middleware/auth");

router.get("/users", getUsers);
router.post("/users", authCheck, createOrUpdateUser);
router.post("/login-user", authCheck, loginUser);
router.get("/users/:_id", readUser);
router.delete("/users/:_id", deleteUser);
router.post("/users/address", authCheck, saveAddress);

module.exports = router;
