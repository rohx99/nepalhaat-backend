const ContactEnquiry = require("../models/contactEnquiryModel");

const postEnquiry = async (req, res) => {
  const { name, contact, message } = req.body;
  try {
    await ContactEnquiry.create({
      name,
      contact,
      message,
    });
    return res.status(201).json({
      success: true,
      message: "Enquiry posted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to post enquiry",
      error: error.message,
    });
  }
};

const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await ContactEnquiry.find();
    return res.status(200).json({
      success: true,
      enquiries,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve enquiries",
      error: error.message,
    });
  }
};

const enquiryReply = async (req, res) => {
  const { id } = req.params;
  const { response, status } = req.body;
  try {
    await ContactEnquiry.findByIdAndUpdate(
      id,
      { response, status },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Enquiry replied successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to reply to enquiry",
      error: error.message,
    });
  }
};

module.exports = {
  postEnquiry,
  getAllEnquiries,
  enquiryReply,
};
