const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const unlinkAsync = require("../utils/unlinkAsync");
const path = require("path");

const createUser = async (req, res) => {
  const { name, email, password, otherDetails } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User with same email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      otherDetails,
    });

    if (req.file) {
      newUser.profilePicture = req.file.path;
      await newUser.save();
    }

    return res.status(201).json({
      success: true,
      message: "New user created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create a new user",
      error: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error,
    });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user",
      error,
    });
  }
};

const updateUser = async (req, res) => {
  const { name, email, password, otherDetails } = req.body;
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.email === process.env.SUPER_ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: You cannot update the admin details",
      });
    }

    const previousData = {};
    const updatedData = {};
    let isUpdated = false;

    if (name && user.name !== name) {
      previousData.name = user.name;
      updatedData.name = name;
      isUpdated = true;
    }
    if (email && user.email !== email) {
      previousData.email = user.email;
      updatedData.email = email;
      isUpdated = true;
    }

    if (password && !(await bcrypt.compare(password, user.password))) {
      previousData.password = user.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
      isUpdated = true;
    }

    if (otherDetails && user.otherDetails !== otherDetails) {
      previousData.otherDetails = user.otherDetails;
      updatedData.otherDetails = otherDetails;
      isUpdated = true;
    }

    if (req.file) {
      const updatedProfilePicture = req.file.path;
      previousData.profilePicture = user.profilePicture;

      if (user.profilePicture) {
        const oldFilePath = path.join(__dirname, "..", user.profilePicture);
        try {
          await unlinkAsync(oldFilePath);
        } catch (err) {
          console.error("Error deleting old profile photo:", err);
        }
      }

      updatedData.profilePicture = updatedProfilePicture;
      isUpdated = true;
    }

    if (!isUpdated) {
      return res.status(400).json({
        success: false,
        message: "No changes were made !",
      });
    }

    user.set(updatedData);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Profile details updated successfully.",
      user: {
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update profile details",
      error: error.message,
    });
  }
};

const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent deleting main admin
    if (user.email === process.env.SUPER_ADMIN_EMAIL) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: You cannot delete the admin",
      });
    }

    // await User.findByIdAndDelete(id);
    await User.delete({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Users deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete users",
      error: error.message,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUserById,
};
