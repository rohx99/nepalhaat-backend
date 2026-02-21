const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { generateUserToken } = require("../utils/generateToken");

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials, please try again !",
        error: "User not found",
      });
    }

    if (user.password && (await bcrypt.compare(password, user.password))) {
      const userDetails = {
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
      };

      const token = generateUserToken(user._id);

      return res
        .cookie("token", token)
        .status(200)
        .json({
          success: true,
          message: `Welcome ${user.name} !`,
          userDetails,
          token,
        });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentails, please try again",
        error: "Password mismatch",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to login",
      error: error.message,
    });
  }
};

module.exports = { userLogin };
