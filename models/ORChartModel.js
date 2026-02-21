const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const ORChartSchema = new Schema(
  {
    orders: { type: String },
    revenue: { type: String },
    date: { type: String },
  },
  { timestamps: false }
);

const ORChart = model("ORChart", ORChartSchema);

module.exports = ORChart;
