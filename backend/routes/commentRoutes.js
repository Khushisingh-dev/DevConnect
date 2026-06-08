const express = require("express");

const {
  addComment,
  getComments,
  deleteComment,
} = require("../controllers/commentController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:postId", protect, addComment);

router.get("/:postId", getComments);

router.delete("/:id", protect, deleteComment);

module.exports = router;