const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const { getMyProfile, createProfile, updateProfile } = require("../controllers/profileController");

router.get("/me", verifyToken, getMyProfile);
router.post("/", verifyToken, createProfile);
router.put("/", verifyToken, updateProfile);

module.exports = router;
