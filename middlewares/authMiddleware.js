const jwt = require("jsonwebtoken");

const protectedRoute = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.log("JWT verification failed:", error);
    return res.status(401).json({
      success: false,
      message: "Session expired, please login again.",
      error: error.message,
    });
  }
};

module.exports = protectedRoute;
