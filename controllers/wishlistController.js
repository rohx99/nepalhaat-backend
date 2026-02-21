const Wishlist = require("../models/wishlistModel");

const getWishlistByCustomerId = async (req, res) => {
  const { customerId } = req.params;
  try {
    const customerWishlist = await Wishlist.findOne({ customerId }).populate({
      path: "productIds",
      select:
        "productName slug price discount productImageOne starsCount subCategoryName categoryName reviews",
    });
    return res.status(200).json({
      success: true,
      customerWishlist: customerWishlist || {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch customer's wishlist",
      error: error.message,
    });
  }
};

const addProductToWishlist = async (req, res) => {
  const { customerId } = req.params;
  const { productId } = req.body;

  try {
    // check if wishlist exists
    let wishlist = await Wishlist.findOne({ customerId });

    if (!wishlist) {
      // create a new wishlist if none exists
      wishlist = new Wishlist({
        customerId,
        productIds: [productId],
      });
      await wishlist.save();
    } else {
      // check if product already exists in wishlist
      if (wishlist.productIds.includes(productId)) {
        return res.status(409).json({
          success: false,
          message: "Product already in wishlist",
        });
      }

      wishlist.productIds.push(productId);
      await wishlist.save();
    }

    // populate products when returning
    const populatedWishlist = await Wishlist.findById(wishlist._id).populate({
      path: "productIds",
      select:
        "productName slug price discount productImageOne starsCount reviews",
    });

    return res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      wishlist: populatedWishlist,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to add product to wishlist",
      error: error.message,
    });
  }
};

const removeProductFromWishlist = async (req, res) => {
  const { customerId } = req.params;
  const { productId } = req.body;
  try {
    const updatedWishlist = await Wishlist.findOneAndUpdate(
      { customerId },
      { $pull: { productIds: productId } }, // removes product
      { new: true }
    );

    if (!updatedWishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found for this customer",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist: updatedWishlist,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to remove product from wishlist",
      error: error.message,
    });
  }
};

module.exports = {
  getWishlistByCustomerId,
  addProductToWishlist,
  removeProductFromWishlist,
};
