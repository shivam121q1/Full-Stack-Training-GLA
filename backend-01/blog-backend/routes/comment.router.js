const express = require("express");
const router = express.Router();
const {
    addComment,
    getBlogComments,
    deleteComment,
} = require("../controller/comment.controller");
const { authMiddleware } = require("../middleware/authMiddleware");

router.get("/:blogId", getBlogComments);
router.post("/:blogId", authMiddleware, addComment);
router.delete("/:id", authMiddleware, deleteComment);

module.exports = router;
