const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const { Schema, model } = mongoose;

const reviewSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    message: { type: String, required: true },
    stars: { type: Number, min: 1, max: 5, required: true },
  },
  { timestamps: true, _id: false }
);

const productSchema = new Schema(
  {
    productName: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    categoryName: { type: String, required: true },
    subCategoryName: { type: String, required: true },
    gender: { type: Schema.Types.Mixed },
    price: { type: Number, required: true },
    color: [{ type: String }],
    sizes: [{ type: String }],
    quantity: { type: Number },
    discount: { type: String },
    description: { type: String },
    productImageOne: { type: String },
    productImageTwo: { type: String },
    productImageThree: { type: String },
    productImageFour: { type: String },
    productImageFive: { type: String },
    productVideo: { type: String },
    status: { type: Boolean, default: true },
    reviews: [reviewSchema],
    starsCount: { type: Number, default: 0 },
    sellerName: { type: String },
    sellerRating: { type: Number, min: 1, max: 5 },
  },
  { timestamps: true }
);

// Soft delete plugin
productSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

// Middleware to update starsCount automatically
productSchema.pre("save", function (next) {
  if (this.reviews.length > 0) {
    const avg =
      this.reviews.reduce((sum, r) => sum + r.stars, 0) / this.reviews.length;
    this.starsCount = avg.toFixed(1); // rounded to 1 decimal
  } else {
    this.starsCount = 0;
  }
  next();
});

const Product = model("Product", productSchema);

module.exports = Product;
