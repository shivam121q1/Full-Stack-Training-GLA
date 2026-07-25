const express = require("express");
const router = express.Router();
const {
    createBlog,
    getAllBlogs,
    getByIdBlog,
    updateBlog,
    DeleteBlog,
    getMyBlogs,
    toggleLikeBlog,
} = require("../controller/blog.controller");
const { authMiddleware, isAuthorOrAdmin } = require("../middleware/authMiddleware");

router.get("/", getAllBlogs);
router.get("/my-blogs", authMiddleware, getMyBlogs);
router.get("/:id", getByIdBlog);

router.post("/", authMiddleware, isAuthorOrAdmin, createBlog);
router.put("/:id", authMiddleware, isAuthorOrAdmin, updateBlog);
router.delete("/:id", authMiddleware, isAuthorOrAdmin, DeleteBlog);

router.post("/:id/like", authMiddleware, toggleLikeBlog);

module.exports = router;