const express = require("express");

const {
  getUserProfile,
  getMyProfile,
  updateProfile,
  deleteAccount,
} = require("../controllers/userController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:id", getUserProfile);

router.get("/me", protect, getMyProfile);

router.put("/profile/update",
  protect,
  updateProfile
);

router.delete(
  "/profile/delete",
  protect,
  deleteAccount
);

module.exports = router;