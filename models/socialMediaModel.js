const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const { Schema, model } = mongoose;

const SocialMediaSchema = new Schema(
  {
    type: { type: Number, required: true },
    key: { type: String, required: true },
    value: { type: String, required: true },
  },
  { timestamps: true }
);

// Soft delete
SocialMediaSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const SocialMedia = model("SocialMedia", SocialMediaSchema);

module.exports = SocialMedia;
