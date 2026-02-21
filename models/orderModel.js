const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: String },
    color: { type: String },
    size: { type: String },
    couponId: { type: Schema.Types.ObjectId, ref: "Coupon" },
    finalPrice: { type: String },
    status: { type: String },
    deliveryAddress: { type: String },
    trackingId: { type: String },
    trackingCompany: { type: String },
    trackingLink: { type: String },
  },
  { timestamps: true }
);

// Soft delete
orderSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const Order = model("Order", orderSchema);

module.exports = Order;
