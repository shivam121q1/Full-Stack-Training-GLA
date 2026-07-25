const Comment = require("../models/comment.model");
const Blog = require("../models/blog.model");

const addComment = async (request, response) => {
    try {
        const { blogId } = request.params;
        const { content } = request.body;

        if (!content || !content.trim()) {
            return response.status(400).json({
                success: false,
                message: "Comment content cannot be empty",
            });
        }

        const blog = await Blog.findById(blogId);
        if (!blog) {
            return response.status(404).json({
                success: false,
                message: "Blog post not found",
            });
        }

        const newComment = await Comment.create({
            content: content.trim(),
            blog: blogId,
            user: request.user._id,
        });

        const comment = await Comment.findById(newComment._id).populate(
            "user",
            "fullName email avatar"
        );

        return response.status(201).json({
            success: true,
            message: "Comment added successfully",
            comment,
        });
    } catch (error) {
        console.error("Add comment error:", error);
        return response.status(500).json({
            success: false,
            message: "Failed to add comment",
            error: error.message,
        });
    }
};

const getBlogComments = async (request, response) => {
    try {
        const { blogId } = request.params;

        const comments = await Comment.find({ blog: blogId })
            .populate("user", "fullName email avatar")
            .sort({ createdAt: -1 });

        return response.status(200).json({
            success: true,
            count: comments.length,
            comments,
        });
    } catch (error) {
        console.error("Get blog comments error:", error);
        return response.status(500).json({
            success: false,
            message: "Failed to fetch comments",
            error: error.message,
        });
    }
};

const deleteComment = async (request, response) => {
    try {
        const { id } = request.params;

        const comment = await Comment.findById(id);
        if (!comment) {
            return response.status(404).json({
                success: false,
                message: "Comment not found",
            });
        }

        const blog = await Blog.findById(comment.blog);

        const isCommentAuthor =
            comment.user.toString() === request.user._id.toString();
        const isBlogAuthor =
            blog && blog.author.toString() === request.user._id.toString();
        const isAdmin = request.user.role === "Admin";

        if (!isCommentAuthor && !isBlogAuthor && !isAdmin) {
            return response.status(403).json({
                success: false,
                message: "You are not authorized to delete this comment",
            });
        }

        await Comment.findByIdAndDelete(id);

        return response.status(200).json({
            success: true,
            message: "Comment deleted successfully",
        });
    } catch (error) {
        console.error("Delete comment error:", error);
        return response.status(500).json({
            success: false,
            message: "Failed to delete comment",
            error: error.message,
        });
    }
};

module.exports = {
    addComment,
    getBlogComments,
    deleteComment,
};
