const express = require("express");
const {
  postEnquiry,
  getAllEnquiries,
  enquiryReply,
} = require("../controllers/contactEnquiryController");

const router = express.Router();

router.post("/", postEnquiry);
router.get("/", getAllEnquiries);
router.put("/:id", enquiryReply);

module.exports = router;
