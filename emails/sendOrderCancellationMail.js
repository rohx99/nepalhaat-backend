require("dotenv").config();

const Order = require("../models/orderModel");
const {
  orderCancellationTemplate,
} = require("../templates/orderCancellationTemplate");
const { gmailTransporter } = require("../utils/gmailSMTPTransporter");

const sendOrderCancellationMail = async (orderId) => {
  try {
    const order = await Order.findById(orderId)
      .populate({
        path: "productId",
        select: "productName productImageOne",
      })
      .populate({
        path: "customerId",
        select: "email",
      });

    await gmailTransporter.sendMail({
      from: `${process.env.GMAIL_SMTP_FROM_NAME} <${process.env.GMAIL_SMTP_USER_EMAIL}>`,
      to: order.customerId.email,
      subject: "Order Canceled!",
      html: orderCancellationTemplate
        .replaceAll("{orderId}", orderId)
        .replaceAll("{finalPrice}", order.finalPrice)
        .replaceAll(
          "{productImage}",
          order.productId.productImageOne.replace(/\\/g, "/")
        )
        .replaceAll("{productName}", order.productId.productName)
        .replaceAll("{quantity}", order.quantity),
    });
  } catch (error) {
    throw error;
  }
};

module.exports = sendOrderCancellationMail;
