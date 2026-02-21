require("dotenv").config();

const nodemailer = require("nodemailer");

const gmailTransporter = nodemailer.createTransport({
  host: process.env.GMAIL_SMTP_HOST,
  port: process.env.GMAIL_SMTP_PORT,
  secure: true,
  auth: {
    user: process.env.GMAIL_SMTP_USER_EMAIL,
    pass: process.env.GMAIL_SMTP_APP_PASSWORD,
  },
  // logger: true,
  // debug: true,
});

module.exports = { gmailTransporter };
