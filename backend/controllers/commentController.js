const Comment = require("../models/Comment");

// Add Comment
const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    const comment = await Comment.create({
      post: req.params.postId,
      user: req.user._id,
      text,
    });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Comments Of Post
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId,
    })
      .populate("user", "username")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Comment
const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (
      comment.user.toString() !== req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      message: "Comment Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addComment,
  getComments,
  deleteComment,
};