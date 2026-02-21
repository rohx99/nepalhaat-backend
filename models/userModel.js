const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    otherDetails: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

// Soft delete plugin
userSchema.plugin(mongooseDelete, {
  deletedAt: true, // Adds deletedAt field
  overrideMethods: true, // Overrides default methods to exclude deleted docs
});

const User = model("User", userSchema);

module.exports = User;
