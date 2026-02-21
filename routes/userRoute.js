const express = require("express");
const upload = require("../config/multer");
const {
  createUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUserById,
} = require("../controllers/userController");
const protectedRoute = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", upload.single("profilePicture"), createUser);
router.get("/", protectedRoute, getAllUsers);
router.get("/:id", protectedRoute, getUserById);
router.put("/:id", protectedRoute, upload.single("profilePicture"), updateUser);
router.delete("/:id", protectedRoute, deleteUserById);

module.exports = router;
