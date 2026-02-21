require("dotenv").config();

const Order = require("../models/orderModel");
const { orderShippedTemplate } = require("../templates/orderShippedTemplate");
const { gmailTransporter } = require("../utils/gmailSMTPTransporter");

const sendOrderShippedMail = async (orderId) => {
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
      subject: "Order Shipped!",
      html: orderShippedTemplate
        .replaceAll("{orderId}", orderId)
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

module.exports = sendOrderShippedMail;
