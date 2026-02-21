require("dotenv").config();

const {
  customerSignedUpTemplate,
} = require("../templates/customerSignedUpTemplate");
const { gmailTransporter } = require("../utils/gmailSMTPTransporter");

const sendCustomerSignupMail = async (
  customerName,
  customerEmail,
  randomPassword
) => {
  try {
    await gmailTransporter.sendMail({
      from: `${process.env.GMAIL_SMTP_FROM_NAME} <${process.env.GMAIL_SMTP_USER_EMAIL}>`,
      to: customerEmail,
      subject: "Welcome to NepalHaat!",
      html: customerSignedUpTemplate
        .replaceAll("{email}", customerEmail)
        .replaceAll("{password}", randomPassword)
        .replaceAll("{customerName}", customerName),
    });
  } catch (error) {
    throw error;
  }
};

module.exports = sendCustomerSignupMail;
