const express = require("express");
const {
  dashboardCounts,
  getORChartValues,
} = require("../controllers/dashboardController");

const router = express.Router();

router.get("/counts", dashboardCounts);
router.get("/chart/data", getORChartValues);

module.exports = router;
