const router = require("express").Router();
const {
  getUsers,
  readUser,
  createOrUpdateUser,
  deleteUser,
} = require("../controller/userController");

router.get("/users", getUsers);
router.post("/users", createOrUpdateUser);
router.get("/users/:_id", readUser);
router.delete("/users/:_id", deleteUser);

module.exports = router;
