const Blog = require("../models/blog.model");
const Comment = require("../models/comment.model");

const createBlog = async (request, response) => {
    try {
        const { title, content, category, image } = request.body;

        if (!title || !content || !category) {
            return response.status(400).json({
                success: false,
                message: "Please provide all required fields: title, content, category",
            });
        }

        const newBlog = await Blog.create({
            title: title.trim(),
            content,
            category: category.trim(),
            image: image || "",
            author: request.user._id,
        });

        const blog = await Blog.findById(newBlog._id).populate(
            "author",
            "fullName email avatar role"
        );

        return response.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog,
        });
    } catch (error) {
        console.error("Create blog error:", error);
        return response.status(500).json({
            success: false,
            message: "Blog creation failed",
            error: error.message,
        });
    }
};

const getAllBlogs = async (request, response) => {
    try {
        const page = parseInt(request.query.page, 10) || 1;
        const limit = parseInt(request.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        const { category, search } = request.query;

        const filter = {};

        if (category) {
            filter.category = { $regex: category, $options: "i" };
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { content: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
            ];
        }

        const totalBlogs = await Blog.countDocuments(filter);
        const blogs = await Blog.find(filter)
            .populate("author", "fullName email avatar role")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return response.status(200).json({
            success: true,
            count: blogs.length,
            totalBlogs,
            totalPages: Math.ceil(totalBlogs / limit),
            currentPage: page,
            blogs,
        });
    } catch (error) {
        console.error("Get all blogs error:", error);
        return response.status(500).json({
            success: false,
            message: "Failed to fetch blogs",
            error: error.message,
        });
    }
};

const getByIdBlog = async (request, response) => {
    try {
        const { id } = request.params;

        const blog = await Blog.findById(id).populate(
            "author",
            "fullName email avatar role"
        );

        if (!blog) {
            return response.status(404).json({
                success: false,
                message: "Blog post not found",
            });
        }

        const comments = await Comment.find({ blog: id })
            .populate("user", "fullName email avatar")
            .sort({ createdAt: -1 });

        return response.status(200).json({
            success: true,
            blog,
            comments,
        });
    } catch (error) {
        console.error("Get blog by ID error:", error);
        return response.status(500).json({
            success: false,
            message: "Failed to fetch blog post",
            error: error.message,
        });
    }
};

const updateBlog = async (request, response) => {
    try {
        const { id } = request.params;
        const { title, content, category, image } = request.body;

        const blog = await Blog.findById(id);

        if (!blog) {
            return response.status(404).json({
                success: false,
                message: "Blog post not found",
            });
        }



        const isAuthor = blog.author.toString() === request.user._id.toString();
        const isAdmin = request.user.role === "Admin";

        if (!isAuthor && !isAdmin) {
            return response.status(403).json({
                success: false,
                message: "You are not authorized to update this blog post",
            });
        }

        if (title) blog.title = title.trim();
        if (content) blog.content = content;
        if (category) blog.category = category.trim();
        if (image !== undefined) blog.image = image;

        await blog.save();

        const updatedBlog = await Blog.findById(id).populate(
            "author",
            "fullName email avatar role"
        );

        return response.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog: updatedBlog,
        });
    } catch (error) {
        console.error("Update blog error:", error);
        return response.status(500).json({
            success: false,
            message: "Failed to update blog post",
            error: error.message,
        });
    }
};

const DeleteBlog = async (request, response) => {
    try {
        const { id } = request.params;

        const blog = await Blog.findById(id);

        if (!blog) {
            return response.status(404).json({
                success: false,
                message: "Blog post not found",
            });
        }

        const isAuthor = blog.author.toString() === request.user._id.toString();
        const isAdmin = request.user.role === "Admin";

        if (!isAuthor && !isAdmin) {
            return response.status(403).json({
                success: false,
                message: "You are not authorized to delete this blog post",
            });
        }

        await Blog.findByIdAndDelete(id);
        await Comment.deleteMany({ blog: id });

        return response.status(200).json({
            success: true,
            message: "Blog post and associated comments deleted successfully",
        });
    } catch (error) {
        console.error("Delete blog error:", error);
        return response.status(500).json({
            success: false,
            message: "Failed to delete blog post",
            error: error.message,
        });
    }
};

const getMyBlogs = async (request, response) => {
    try {
        const page = parseInt(request.query.page, 10) || 1;
        const limit = parseInt(request.query.limit, 10) || 10;
        const skip = (page - 1) * limit;

        const filter = { author: request.user._id };

        const totalBlogs = await Blog.countDocuments(filter); //total count blog of the user

        const blogs = await Blog.find({ author: request.user._id }) //get the blog of the user with pagination
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        return response.status(200).json({
            success: true,
            count: blogs.length,
            totalBlogs,
            totalPages: Math.ceil(totalBlogs / limit),
            currentPage: page,
            blogs,
        });
    } catch (error) {
        console.error("Get my blogs error:", error);
        return response.status(500).json({
            success: false,
            message: "Failed to fetch user blogs",
            error: error.message,
        });
    }
};

const toggleLikeBlog = async (request, response) => {
    try {
        const { id } = request.params;
        const userId = request.user._id;

        const blog = await Blog.findById(id);

        if (!blog) {
            return response.status(404).json({
                success: false,
                message: "Blog post not found",
            });
        }

        const isLiked = blog.likes.includes(userId);

        if (isLiked) {
            blog.likes = blog.likes.filter(
                (likeId) => likeId.toString() !== userId.toString()
            );
        } else {
            blog.likes.push(userId);
        }

        await blog.save();

        return response.status(200).json({
            success: true,
            message: isLiked ? "Unliked blog post" : "Liked blog post",
            likesCount: blog.likes.length,
            isLiked: !isLiked,
        });
    } catch (error) {
        console.error("Toggle like error:", error);
        return response.status(500).json({
            success: false,
            message: "Failed to update like status",
            error: error.message,
        });
    }
};

module.exports = {
    createBlog,
    updateBlog,
    DeleteBlog,
    getByIdBlog,
    getAllBlogs,
    getMyBlogs,
    toggleLikeBlog,
};