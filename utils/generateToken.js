require("dotenv").config();
const jwt = require("jsonwebtoken");

const expiry = process.env.JWT_EXPIRY;

const generateUserToken = (userId) => {
  const payload = {
    userId,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiry,
  });

  return token;
};

const generateCustomerToken = (customerId) => {
  const payload = {
    customerId,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiry,
  });

  return token;
};

module.exports = { generateUserToken, generateCustomerToken };
