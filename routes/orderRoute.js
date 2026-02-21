const express = require("express");
const {
  placeOrder,
  getAllCustomerOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

router.post("/", placeOrder);
router.get("/", getAllOrders);
router.patch("/:id", updateOrderStatus);
router.get("/customer/:id", getAllCustomerOrders);

module.exports = router;
