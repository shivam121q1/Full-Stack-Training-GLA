const Blog = require("../models/blog.model");

const createBlog = async (request, response) => {
    try {

        const { title, content, category, image } = request.body;
        console.log("Blog controller")

        if (!title || !content || !category) {
            return response.status(400).json({
                success: false,
                message: "Please provide all the required fields"
            })
        }
        const blog = await Blog.create({
            title,
            content,
            category,
            image,
            author: request.user._id

        })

        response.status(201).json({
            success: true,
            message: "Blog created successfully",
            blog
        })

    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success: false,
            message: "Blog creation failed",
            error: error.message
        })

    }
}

const updateBlog = async (request, response) => {
    try {

    } catch (error) {

    }
}
const DeleteBlog = async (request, response) => {
    try {

    } catch (error) {

    }
}
const getByIdBlog = async (request, response) => {
    try {

    } catch (error) {

    }
}

const getAllBlogs = async (request, response) => {
    try {

    } catch (error) {

    }
}

module.exports = { createBlog, updateBlog, DeleteBlog, getByIdBlog, getAllBlogs }