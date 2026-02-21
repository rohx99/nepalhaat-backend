const express = require("express");
const {
  getWishlistByCustomerId,
  addProductToWishlist,
  removeProductFromWishlist,
} = require("../controllers/wishlistController");

const router = express.Router();

router.get("/:customerId", getWishlistByCustomerId);
router.post("/:customerId", addProductToWishlist);
router.put("/:customerId", removeProductFromWishlist);

module.exports = router;
