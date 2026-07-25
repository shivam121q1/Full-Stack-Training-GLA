const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        avatar: {
            type: String,
            default: "",
        },
        fullName: {
            type: String,
            required: [true, "Full name is required"],
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"],
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        role: {
            type: String,
            enum: ["Admin", "Author", "Reader"],
            default: "Author",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);