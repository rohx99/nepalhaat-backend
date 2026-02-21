const express = require("express");
const {
  createNewProduct,
  getAllProducts,
  getProductByID,
  updateProductByID,
  deleteProductById,
  updateProductStatusByID,
  addReview,
  getProductBySlug,
  deleteMedia,
} = require("../controllers/productController");
const upload = require("../config/multer");
const protectedRoute = require("../middlewares/authMiddleware");

const router = express.Router();

router.post(
  "/",
  protectedRoute,
  upload.fields([
    { name: "productImageOne", maxCount: 1 },
    { name: "productImageTwo", maxCount: 1 },
    { name: "productImageThree", maxCount: 1 },
    { name: "productImageFour", maxCount: 1 },
    { name: "productImageFive", maxCount: 1 },
    { name: "productVideo", maxCount: 1 },
  ]),
  createNewProduct
);
router.post("/review/:productId", protectedRoute, addReview);
router.get("/", getAllProducts);
router.get("/:id", protectedRoute, getProductByID);
router.get("/slug/:slug", getProductBySlug);
router.put(
  "/:id",
  protectedRoute,
  upload.fields([
    { name: "productImageOne", maxCount: 1 },
    { name: "productImageTwo", maxCount: 1 },
    { name: "productImageThree", maxCount: 1 },
    { name: "productImageFour", maxCount: 1 },
    { name: "productImageFive", maxCount: 1 },
    { name: "productVideo", maxCount: 1 },
  ]),
  updateProductByID
);
router.patch("/:id", protectedRoute, updateProductStatusByID);
router.delete("/:id", protectedRoute, deleteProductById);
router.delete("/:id/media/:field", protectedRoute, deleteMedia);

module.exports = router;
