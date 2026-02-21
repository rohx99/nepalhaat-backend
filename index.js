require("dotenv").config();
const express = require("express");
const dbConnection = require("./config/db");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoute");
const userRoutes = require("./routes/userRoute");
const customerRoutes = require("./routes/customerRoute");
const productRoutes = require("./routes/productRoute");
const dashboardRoutes = require("./routes/dashboardRoutes");
const orderRoutes = require("./routes/orderRoute");
const couponRoutes = require("./routes/couponRoutes");
const socialMediaRoutes = require("./routes/socialMediaRoutes");
const contactEnquiryRoutes = require("./routes/contactEnquiryRoutes");
const wishlistRoutes = require("./routes/wishlistRoute");
const { generateORDailyPointCron } = require("./auto/orderRevenueCron");
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.use(helmet());
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, path, stat) => {
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);
app.set("trust proxy", true);

// app.get("/", (req, res) => {
//   return res.redirect("https://nepalhaat.com/");
// });

app.get("/", (req, res) => {
  return res.send("Nepal Haat API is running");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/products", productRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/social/media", socialMediaRoutes);
app.use("/api/contact/enquiry", contactEnquiryRoutes);
app.use("/api/wishlist", wishlistRoutes);

// Cron
generateORDailyPointCron();

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  try {
    console.log(`Server is listening on PORT ${PORT}`);
    await dbConnection();
    console.log("Connected to Database");
  } catch (error) {
    console.log(error);
  }
});
