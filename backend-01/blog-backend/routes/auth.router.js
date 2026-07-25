const express = require("express");
const router = express.Router();
const {
    registerUser,
    login,
    getProfile,
    updateProfile,
} = require("../controller/auth.controller");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", login);
router.get("/me", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

module.exports = router;