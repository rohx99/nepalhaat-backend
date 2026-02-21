const express = require("express");
const upload = require("../config/multer");
const protectedRoute = require("../middlewares/authMiddleware");
const {
  customerSignUp,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
  deleteCustomerById,
  customerLogin,
  createCustomer,
} = require("../controllers/customerController");

const router = express.Router();

router.post("/", upload.single("profilePicture"), customerSignUp);
router.post("/create/for/order", createCustomer);
router.post("/login", customerLogin);
router.get("/", protectedRoute, getAllCustomers);
router.get("/:id", protectedRoute, getCustomerById);
router.put(
  "/:id",
  protectedRoute,
  upload.single("profilePicture"),
  updateCustomerById
);
router.delete("/:id", protectedRoute, deleteCustomerById);

module.exports = router;
