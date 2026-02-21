const SocialMedia = require("../models/socialMediaModel");

const createSM = async (req, res) => {
  const { type, key, value } = req.body;
  try {
    await SocialMedia.create({
      type,
      key,
      value,
    });

    return res.status(201).json({
      success: true,
      message: "SM created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create SM",
      error,
    });
  }
};

const getAllSM = async (req, res) => {
  try {
    const data = await SocialMedia.find();

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch social media links",
      error: error.message,
    });
  }
};

const getSMByType = async (req, res) => {
  const { type } = req.params;
  try {
    const data = await SocialMedia.findOne({ type });
    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch social media by type",
      error,
    });
  }
};

const updateSMByID = async (req, res) => {
  const { type, key, value } = req.body;
  const { id } = req.params;
  try {
    await SocialMedia.findByIdAndUpdate(
      id,
      {
        type,
        key,
        value,
      },
      {
        runValidators: true,
        new: true,
      }
    );

    return res.status(201).json({
      success: true,
      message: "SM created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create SM",
      error,
    });
  }
};

const deleteSMByID = async (req, res) => {
  const { id } = req.params;
  try {
    await SocialMedia.findByIdAndDelete(id);
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete SM",
      error,
    });
  }
};

module.exports = {
  createSM,
  getAllSM,
  updateSMByID,
  getSMByType,
  deleteSMByID,
};
