const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const posts = await Post.find({
      user: user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      user,
      posts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.username =
      req.body.username || user.username;

    user.bio =
      req.body.bio || user.bio;

    user.profilePic =
      req.body.profilePic || user.profilePic;

    const updatedUser = await user.save();

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteAccount = async (req, res) => {
  try {
    await Post.deleteMany({
      user: req.user._id,
    });

    await Comment.deleteMany({
      user: req.user._id,
    });

    await User.findByIdAndDelete(
      req.user._id
    );

    res.status(200).json({
      message: "Account Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    const posts = await Post.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.json({
      user,
      posts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getUserProfile,
  getMyProfile,
  updateProfile,
  deleteAccount,
};