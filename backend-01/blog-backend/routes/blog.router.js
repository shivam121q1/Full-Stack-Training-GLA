const express = require("express");
const router = express.Router();
const { createBlog } = require("../controller/blog.controller");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/blogs/create", authMiddleware, createBlog);

module.exports = router;