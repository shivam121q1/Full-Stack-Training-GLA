const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        category: {
            type: String,
            required: [true, "Category is required"],
            trim: true,
        },
        image: {
            type: String,
            default: "",
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

blogSchema.index({ title: "text", category: "text" });

module.exports = mongoose.model("Blog", blogSchema);