const sendOrderCancellationMail = require("../emails/sendOrderCancellationMail");
const sendOrderConfirmationMail = require("../emails/sendOrderConfirmationMail");
const sendOrderDeliveredMail = require("../emails/sendOrderDeliveredMail");
const sendOrderPlacedMail = require("../emails/sendOrderPlacedMail");
const sendOrderShippedMail = require("../emails/sendOrderShippedMail");
const sendOrderTrackingMail = require("../emails/sendOrderTrackingMail");
const Order = require("../models/orderModel");

// Pending
// Confirmed
// Shipped
// Delivered
// Cancelled
// Returned

const placeOrder = async (req, res) => {
  const {
    customerId,
    quantity,
    color,
    size,
    couponId,
    finalPrice,
    productId,
    deliveryAddress,
  } = req.body;
  try {
    const newOrder = await Order.create({
      customerId,
      productId,
      quantity,
      color,
      size,
      couponId: couponId === "" ? undefined : couponId,
      finalPrice,
      status: "Pending",
      deliveryAddress,
    });

    setImmediate(async () => {
      try {
        await sendOrderPlacedMail(newOrder._id);
      } catch (err) {
        console.error("sendOrderPlacedMail sending failed", err);
      }
    });

    return res.status(200).json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: error.message,
    });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "productId",
      })
      .populate({
        path: "customerId",
      })
      .populate({
        path: "couponId",
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch all orders",
      error: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status, trackingId, trackingCompany, trackingLink } = req.body;
  try {
    const existingOrder = await Order.findById(id);
    if (!existingOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await Order.findByIdAndUpdate(
      id,
      {
        status,
        trackingId,
        trackingCompany,
        trackingLink,
      },
      { new: true, runValidators: true }
    );

    if (status === "Confirmed") {
      setImmediate(async () => {
        try {
          await sendOrderConfirmationMail(id);
        } catch (err) {
          console.error("sendOrderConfirmationMail sending failed", err);
        }
      });
    } else if (status === "Shipped" && existingOrder.trackingId) {
      setImmediate(async () => {
        try {
          await sendOrderTrackingMail(id);
        } catch (err) {
          console.error("sendOrderTrackingMail sending failed", err);
        }
      });
    } else if (status === "Shipped" && !existingOrder.trackingId) {
      setImmediate(async () => {
        try {
          await sendOrderShippedMail(id);
        } catch (err) {
          console.error("sendOrderShippedMail sending failed", err);
        }
      });
    } else if (status === "Delivered") {
      setImmediate(async () => {
        try {
          await sendOrderDeliveredMail(id);
        } catch (err) {
          console.error("sendOrderDeliveredMail sending failed", err);
        }
      });
    } else if (status === "Cancelled") {
      setImmediate(async () => {
        try {
          await sendOrderCancellationMail(id);
        } catch (err) {
          console.error("sendOrderCancellationMail sending failed", err);
        }
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order status updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update status",
      error: error.message,
    });
  }
};

const getAllCustomerOrders = async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.find({ customerId: id })
      .populate({
        path: "productId",
        select: "productName productImageOne",
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  getAllCustomerOrders,
};
