const express = require("express");
const router = express.Router();
const {
  createOrUpdateArticles,
  list,
  remove,
  read,
  deleteMany,
  listAll,
} = require("../controller/articleController");

const { authCheck } = require("../middleware/auth");

// Private APIs
router.post("/article", authCheck, createOrUpdateArticles);
router.get("/article", list);
router.delete(
  "/article/:_id",
  authCheck,

  remove
);
router.post("/article-delete-many", authCheck, deleteMany);

// Public APIs
router.get("/article-all", listAll);
router.get("/article/:_id", read);

module.exports = router;
