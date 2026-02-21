const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");

const { Schema, model } = mongoose;

const ContactEnquirySchema = new Schema(
  {
    name: { type: String },
    contact: { type: String },
    message: { type: String },
    status: { type: String },
    response: { type: String },
  },
  { timestamps: true }
);

// Soft delete
ContactEnquirySchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: true,
});

const ContactEnquiry = model("ContactEnquiry", ContactEnquirySchema);

module.exports = ContactEnquiry;
