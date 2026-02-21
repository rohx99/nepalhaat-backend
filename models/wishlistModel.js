const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const { Schema, model } = mongoose;

const wishlistSchema = new Schema(
  {
    customerId: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    productIds: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

// Soft delete
wishlistSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const Wishlist = model("Wishlist", wishlistSchema);

module.exports = Wishlist;
