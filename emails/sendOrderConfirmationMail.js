require("dotenv").config();

const moment = require("moment");
const Order = require("../models/orderModel");
const {
  orderConfirmationTemplate,
} = require("../templates/orderConfirmationTemplate");
const { gmailTransporter } = require("../utils/gmailSMTPTransporter");

const sendOrderConfirmationMail = async (orderId) => {
  try {
    const order = await Order.findById(orderId)
      .populate({
        path: "productId",
        select: "productName productImageOne",
      })
      .populate({
        path: "customerId",
        select: "firstName lastName email",
      });

    const customerName = `${order.customerId.firstName} ${order.customerId.lastName}`;

    await gmailTransporter.sendMail({
      from: `${process.env.GMAIL_SMTP_FROM_NAME} <${process.env.GMAIL_SMTP_USER_EMAIL}>`,
      to: order.customerId.email,
      subject: "Order Confirmed!",
      html: orderConfirmationTemplate
        .replaceAll("{orderId}", orderId)
        .replaceAll(
          "{orderedAt}",
          moment(order.createdAt).format("DD/MMM/YYYY | hh:mm A")
        )
        .replaceAll("{finalPrice}", order.finalPrice)
        .replaceAll(
          "{productImage}",
          order.productId.productImageOne.replace(/\\/g, "/")
        )
        .replaceAll("{productName}", order.productId.productName)
        .replaceAll("{quantity}", order.quantity)
        .replaceAll("{customerName}", customerName)
        .replaceAll("{deliveryAddress}", order.deliveryAddress),
    });
  } catch (error) {
    throw error;
  }
};

module.exports = sendOrderConfirmationMail;
