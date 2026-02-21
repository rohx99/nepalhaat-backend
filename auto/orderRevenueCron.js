const ORChart = require("../models/ORChartModel");
const Order = require("../models/orderModel");
const cron = require("node-cron");

const generateORDailyPoint = async () => {
  try {
    const orders = await Order.find();
    const today = new Date().toISOString().split("T")[0];

    const totalPrice = orders.reduce(
      (acc, order) => acc + Number(order.finalPrice),
      0
    );

    await ORChart.create({
      orders: orders.length,
      revenue: Number(totalPrice),
      date: today,
    });

    console.log("Daily ORChart point generated ✅");
  } catch (error) {
    console.error("Error generating ORChart point ❌", error);
  }
};

const generateORDailyPointCron = () => {
  // Runs every day at 23:55
  cron.schedule("55 23 * * *", async () => {
    await generateORDailyPoint();
  });
};

module.exports = {
  generateORDailyPoint,
  generateORDailyPointCron,
};
