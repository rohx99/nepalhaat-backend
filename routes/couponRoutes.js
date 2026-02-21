const express = require("express");
const protectedRoute = require("../middlewares/authMiddleware");
const {
  createCoupon,
  getAllCoupons,
  updateCouponById,
  deleteCouponById,
  getCouponByCode,
  validateCoupon,
} = require("../controllers/couponController");

const router = express.Router();

router.post("/", protectedRoute, createCoupon);
router.get("/", protectedRoute, getAllCoupons);
router.get("/:code", getCouponByCode);
router.put("/:id", protectedRoute, updateCouponById);
router.delete("/:id", protectedRoute, deleteCouponById);
router.post("/validate/code", validateCoupon);

module.exports = router;
