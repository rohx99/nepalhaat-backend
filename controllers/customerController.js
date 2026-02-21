const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");
const Customer = require("../models/customerModel");
const { generateCustomerToken } = require("../utils/generateToken");
const { generateRandomPassword } = require("../utils/generateRandomPassword");
const sendCustomerSignupMail = require("../emails/sendCustomerSignupMail");

const customerSignUp = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    contactNumber,
    address,
    city,
    state,
    country,
    pincode,
  } = req.body;

  try {
    // Check if customer already exists
    const existingCustomer = await Customer.findOne({
      $or: [{ email }, { contactNumber }],
    });
    if (existingCustomer) {
      return res.status(409).json({
        success: false,
        message: "You are already a member, please login !",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create customer
    const newCustomer = await Customer.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contactNumber,
      address,
      city,
      state,
      country,
      pincode,
    });

    // Save profile picture if uploaded
    if (req.file) {
      newCustomer.profilePicture = req.file.path;
      await newCustomer.save();
    }

    setImmediate(async () => {
      try {
        await sendCustomerSignupMail(
          `${newCustomer.firstName} ${newCustomer.lastName}`,
          newCustomer.email,
          password
        );
      } catch (err) {
        console.error("sendCustomerSignupMail sending failed", err);
      }
    });

    return res.status(201).json({
      success: true,
      message: "New user created successfully",
      data: newCustomer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create a new user",
      error: error.message,
    });
  }
};

const createCustomer = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    contactNumber,
    address,
    city,
    state,
    country,
    pincode,
  } = req.body;

  try {
    // Check if customer already exists
    const existingCustomer = await Customer.findOne({
      $or: [{ email }, { contactNumber }],
    });
    if (existingCustomer) {
      return res.status(409).json({
        success: false,
        message: "You are already a member, please login !",
      });
    }

    const randomPassword = generateRandomPassword();

    // Hash password
    const hashedPassword = await bcrypt.hash(randomPassword, 10);

    // Create customer
    const newCustomer = await Customer.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      contactNumber,
      address,
      city,
      state,
      country,
      pincode,
    });

    setImmediate(async () => {
      try {
        await sendCustomerSignupMail(
          `${newCustomer.firstName} ${newCustomer.lastName}`,
          newCustomer.email,
          randomPassword
        );
      } catch (err) {
        console.error("sendCustomerSignupMail sending failed", err);
      }
    });

    return res.status(201).json({
      success: true,
      message: "New user created successfully",
      data: newCustomer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create a new user",
      error: error.message,
    });
  }
};

const customerLogin = async (req, res) => {
  const { emailOrPhone, password } = req.body;
  try {
    const customer = await Customer.findOne({
      $or: [{ email: emailOrPhone }, { contactNumber: emailOrPhone }],
    });

    if (customer) {
      const isMatch = await bcrypt.compare(password, customer.password);
      if (isMatch) {
        const token = generateCustomerToken(customer._id);
        return res
          .cookie("token", token)
          .status(200)
          .json({
            success: true,
            message: `Welcome ${customer.firstName} ${customer.lastName} !`,
            customer,
            token,
          });
      } else {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials, please try again !",
          error: "Password mismatch",
        });
      }
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials, please try again !",
        error: "Customer not found",
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

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: customers.length,
      customers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch customers",
      error: error.message,
    });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch customer",
      error: error.message,
    });
  }
};

const updateCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const existingCustomer = await Customer.findById(id);

    if (!existingCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    // Handle profile picture replacement
    if (req.file) {
      if (
        existingCustomer.profilePicture &&
        fs.existsSync(existingCustomer.profilePicture)
      ) {
        try {
          fs.unlinkSync(path.resolve(existingCustomer.profilePicture));
        } catch (err) {
          console.error("Failed to unlink profile picture:", err.message);
        }
      }
      existingCustomer.profilePicture = req.file.path;
    }

    // Update other fields
    Object.assign(existingCustomer, req.body);
    await existingCustomer.save();

    return res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: existingCustomer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update customer",
      error: error.message,
    });
  }
};

const deleteCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    await customer.deleteOne(); // soft delete + cascade handled in pre middleware

    return res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete customer",
      error: error.message,
    });
  }
};

module.exports = {
  customerSignUp,
  createCustomer,
  customerLogin,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
};
