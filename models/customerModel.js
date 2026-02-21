const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const { Schema, model } = mongoose;

const customerSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    contactNumber: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    pincode: { type: String },
  },
  { timestamps: true }
);

// Soft delete plugin
customerSchema.plugin(mongooseDelete, {
  deletedAt: true, // Adds deletedAt field
  overrideMethods: true, // Overrides default methods to exclude deleted docs
});

// Cascade delete middleware
customerSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const customerId = this._id;
    await mongoose.model("Wishlist").deleteOne({ customerId });
    await mongoose.model("Order").deleteMany({ customerId });
    next();
  }
);

const Customer = model("Customer", customerSchema);

module.exports = Customer;
