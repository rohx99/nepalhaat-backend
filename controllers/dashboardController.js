const Customer = require("../models/customerModel");
const ORChart = require("../models/ORChartModel");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");

const dashboardCounts = async (req, res) => {
  try {
    const [customers, products, users, orders] = await Promise.all([
      Customer.countDocuments(),
      Product.countDocuments(),
      User.countDocuments(),
      Order.find(),
    ]);

    const totalPrice = orders.reduce(
      (acc, order) => acc + Number(order.finalPrice),
      0
    );

    return res.status(200).json({
      success: true,
      counts: {
        customers,
        products,
        users,
        orders: orders.length,
        totalPrice: Number(totalPrice),
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch the counts",
      error: error.message,
    });
  }
};

const getORChartValues = async (req, res) => {
  try {
    const chartData = await ORChart.find();

    return res.status(200).json({
      success: true,
      chartData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch chart data",
      error: error.message,
    });
  }
};

module.exports = {
  dashboardCounts,
  getORChartValues,
};
