const express = require("express");

const {
  createPost,
  getPosts,
  updatePost,
  deletePost,
  likePost,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/")
  .get(getPosts)
  .post(protect, createPost);

router.route("/:id")
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.put("/like/:id", protect, likePost);

module.exports = router;