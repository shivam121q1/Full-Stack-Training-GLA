const User = require("../models/user.model");
const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");

const getAllUsers = async (request, response) => {
    try {
        const users = await User.find().select("-password").sort({ createdAt: -1 });

        return response.status(200).json({
            success: true,
            count: users.length,
            users,
        });
    } catch (error) {
        console.error("Get all users error:", error);
        return response.status(500).json({
            success: false,
            message: "Failed to fetch users",
            error: error.message,
        });
    }
};

const getUserById = async (request, response) => {
    try {
        const { id } = request.params;

        const user = await User.findById(id).select("-password");
        if (!user) {
            return response.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const blogs = await Blog.find({ author: id }).sort({ createdAt: -1 });

        return response.status(200).json({
            success: true,
            user,
            blogsCount: blogs.length,
            blogs,
        });
    } catch (error) {
        console.error("Get user by ID error:", error);
        return response.status(500).json({
            success: false,
            message: "Failed to fetch user profile",
            error: error.message,
        });
    }
};

const deleteUser = async (request, response) => {
    try {
        const { id } = request.params;

        const user = await User.findById(id);
        if (!user) {
            return response.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        await User.findByIdAndDelete(id);
        await Blog.deleteMany({ author: id });
        await Comment.deleteMany({ user: id });

        return response.status(200).json({
            success: true,
            message: "User and associated blogs and comments deleted successfully",
        });
    } catch (error) {
        console.error("Delete user error:", error);
        return response.status(500).json({
            success: false,
            message: "Failed to delete user",
            error: error.message,
        });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
};
