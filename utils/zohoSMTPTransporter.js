require("dotenv").config();

const nodemailer = require("nodemailer");

const zohotTransporter = nodemailer.createTransport({
  host: process.env.ZOHO_SMTP_HOST,
  port: process.env.ZOHO_SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.ZOHO_SMTP_USER_EMAIL,
    pass: process.env.ZOHO_SMTP_APP_PASSWORD,
  },
  // logger: true,
  // debug: true,
});

module.exports = { zohotTransporter };
