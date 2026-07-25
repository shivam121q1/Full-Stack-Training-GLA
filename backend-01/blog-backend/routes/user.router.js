const express = require("express");
const router = express.Router();
const {
    getAllUsers,
    getUserById,
    deleteUser,
} = require("../controller/user.controller");
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware");

router.get("/", authMiddleware, isAdmin, getAllUsers);
router.get("/:id", getUserById);
router.delete("/:id", authMiddleware, isAdmin, deleteUser);

module.exports = router;
