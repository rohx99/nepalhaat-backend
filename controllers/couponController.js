const moment = require("moment");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");

// Active
// Deactivated

// reduce-by-amount
// reduce-by-percent

const createCoupon = async (req, res) => {
  const { name, code, type, value, isOneTime, expiresOn } = req.body;
  try {
    const existingCoupon = await Coupon.findOne({ code });

    if (existingCoupon) {
      return res.status(409).json({
        success: false,
        message: "Coupon with same code already exists",
      });
    }

    await Coupon.create({
      name,
      code,
      type,
      status: "Active",
      value,
      isOneTime,
      expiresOn,
    });
    return res.status(201).json({
      success: true,
      message: "Coupon created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create coupon",
      error: error.message,
    });
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      coupons,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch coupons",
      error: error.message,
    });
  }
};

const getCouponByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const coupon = await Coupon.findOne({ code });
    return res.status(200).json({
      success: true,
      coupon,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch coupon",
      error: error.message,
    });
  }
};

const updateCouponById = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedCoupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Coupon updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update coupon",
      error: error.message,
    });
  }
};

const deleteCouponById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id);

    if (!deletedCoupon) {
      return res.status(404).json({
        success: false,
        message: "Coupon not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Coupon deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete coupon",
      error: error.message,
    });
  }
};

const validateCoupon = async (req, res) => {
  const { code, price } = req.body;
  try {
    const coupon = await Coupon.findOne({ code });

    if (!coupon || coupon.status === "Deactivated") {
      return res.status(400).json({
        success: false,
        message: "Invalid Coupon",
      });
    }

    if (coupon.isOneTime) {
      const isUsed = await Order.findOne({ couponId: coupon._id });
      if (isUsed) {
        return res.status(400).json({
          success: false,
          message: "Coupon has expired",
        });
      }
    }

    if (coupon.expiresOn) {
      const expiryDate = moment(coupon.expiresOn).endOf("day");
      const isExpire = moment().isAfter(expiryDate);

      if (isExpire) {
        return res.status(400).json({
          success: false,
          message: "Coupon has expired",
        });
      }
    }

    let discountedPrice = parseFloat(price);

    if (coupon.type === "reduce-by-amount") {
      discountedPrice -= Number(coupon.value);
    } else if (coupon.type === "reduce-by-percent") {
      discountedPrice -= (discountedPrice / 100) * Number(coupon.value);
    }

    discountedPrice = Math.max(0, discountedPrice);

    return res.status(200).json({
      success: true,
      message: "Coupon applied successfully",
      discountedPrice,
      couponId: coupon._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to apply coupon",
      error: error.message,
    });
  }
};

module.exports = {
  createCoupon,
  getAllCoupons,
  getCouponByCode,
  updateCouponById,
  deleteCouponById,
  validateCoupon,
};
