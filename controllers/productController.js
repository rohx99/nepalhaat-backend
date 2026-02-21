const Product = require("../models/productModel");
const { generateSlug } = require("../utils/generateSlug");
const fs = require("fs");
const path = require("path");
const unlinkAsync = require("../utils/unlinkAsync");

const createNewProduct = async (req, res) => {
  const {
    productName,
    categoryName,
    subCategoryName,
    gender,
    price,
    quantity,
    discount,
    description,
    color,
    sizes,
    sellerName,
    sellerRating,
  } = req.body;

  try {
    const productSlug = generateSlug(productName);
    const existingProduct = await Product.findOne({ slug: productSlug });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "Product with same name already exists",
      });
    }

    const files = req.files || {};
    const productImages = {
      productImageOne: files.productImageOne
        ? files.productImageOne[0].path
        : null,
      productImageTwo: files.productImageTwo
        ? files.productImageTwo[0].path
        : null,
      productImageThree: files.productImageThree
        ? files.productImageThree[0].path
        : null,
      productImageFour: files.productImageFour
        ? files.productImageFour[0].path
        : null,
      productImageFive: files.productImageFive
        ? files.productImageFive[0].path
        : null,
      productVideo: files.productVideo ? files.productVideo[0].path : null,
    };

    const newProduct = await Product.create({
      productName,
      categoryName,
      subCategoryName,
      slug: productSlug,
      gender,
      price,
      quantity,
      discount,
      description,
      starsCount: 0,
      color,
      sizes,
      sellerName,
      sellerRating,
      ...productImages,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to create a new product",
      error: error.message,
    });
  }
};

const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { customerId, message, stars } = req.body;

    if (!customerId || !message || !stars) {
      return res.status(400).json({
        success: false,
        message: "customerId, message, and stars are required",
      });
    }

    if (stars < 1 || stars > 5) {
      return res.status(400).json({
        success: false,
        message: "Stars rating must be between 1 and 5",
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const existingReview = product.reviews.find(
      (r) => r.customer.toString() === customerId
    );
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this product",
      });
    }

    // Add new review
    product.reviews.push({
      customer: customerId,
      message,
      stars,
    });

    await product.save();

    const updatedProduct = await Product.findById(productId).populate({
      path: "reviews.customer",
      select: "firstName lastName profilePicture",
    });

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      reviews: updatedProduct.reviews,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).populate({
      path: "reviews.customer",
      select: "firstName lastName profilePicture",
    });
    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

const getProductByID = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug }).populate({
      path: "reviews.customer",
      select: "firstName lastName profilePicture",
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

const updateProductByID = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Step 1: Get existing product
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const files = req.files || {};
    const productImages = {};

    // ✅ Step 2: Helper to update only if new file is provided
    const handleFileUpdate = (field, newFile) => {
      if (newFile) {
        // unlink old file if exists
        const oldFilePath = existingProduct[field];
        if (oldFilePath && fs.existsSync(oldFilePath)) {
          try {
            fs.unlinkSync(path.resolve(oldFilePath));
          } catch (err) {
            console.error(`Failed to unlink ${oldFilePath}:`, err.message);
          }
        }
        // assign new path
        productImages[field] = newFile[0].path;
      }
    };

    // ✅ Step 3: Check each possible file field
    handleFileUpdate("productImageOne", files.productImageOne);
    handleFileUpdate("productImageTwo", files.productImageTwo);
    handleFileUpdate("productImageThree", files.productImageThree);
    handleFileUpdate("productImageFour", files.productImageFour);
    handleFileUpdate("productImageFive", files.productImageFive);
    handleFileUpdate("productVideo", files.productVideo);

    // ✅ Step 4: Update product with body + changed files only
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...req.body, ...productImages },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

const updateProductStatusByID = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Find existing product first (needed for unlinking old files)
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await Product.findByIdAndUpdate(
      id,
      {
        status,
      },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to update product",
      error: error.message,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Collect all file paths from the product
    const filesToDelete = [
      deletedProduct.productImageOne,
      deletedProduct.productImageTwo,
      deletedProduct.productImageThree,
      deletedProduct.productImageFour,
      deletedProduct.productImageFive,
      deletedProduct.productVideo,
    ].filter(Boolean); // removes null/undefined

    // Delete files one by one
    for (const filePath of filesToDelete) {
      try {
        await unlinkAsync(filePath);
      } catch (err) {
        console.error(`Failed to delete file ${filePath}:`, err.message);
      }
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

const deleteMedia = async (req, res) => {
  try {
    const { id, field } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    if (product[field]) {
      await unlinkAsync(product[field]);
      product[field] = null;
      await product.save();
    }
    return res.json({
      success: true,
      message: `${field} deleted successfully`,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete media" });
  }
};

module.exports = {
  createNewProduct,
  addReview,
  getAllProducts,
  getProductBySlug,
  getProductByID,
  updateProductByID,
  updateProductStatusByID,
  deleteProductById,
  deleteMedia,
};
