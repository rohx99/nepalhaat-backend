const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const { Schema, model } = mongoose;

const couponSchema = new Schema(
  {
    name: { type: String },
    code: { type: String },
    type: { type: String },
    status: { type: String },
    value: { type: Number },
    isOneTime: { type: Boolean, default: false },
    expiresOn: { type: Date },
  },
  { timestamps: true }
);

// Soft delete
couponSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const Coupon = model("Coupon", couponSchema);

module.exports = Coupon;
