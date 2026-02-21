const express = require("express");
const {
  createSM,
  getAllSM,
  updateSMByID,
  deleteSMByID,
  getSMByType,
} = require("../controllers/socialMediaController");

const router = express.Router();

router.post("/", createSM);
router.get("/", getAllSM);
router.get("/:type", getSMByType);
router.put("/:id", updateSMByID);
router.delete("/:id", deleteSMByID);

module.exports = router;
