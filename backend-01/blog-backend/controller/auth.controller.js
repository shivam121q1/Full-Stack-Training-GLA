const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

const registerUser = async (request, response) => {
    try {
        const { fullName, email, password, role, avatar } = request.body;

        if (!fullName || !email || !password) {
            return response.status(400).json({
                success: false,
                message: "Please fill in all required fields (fullName, email, password)",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();

        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return response.status(400).json({
                success: false,
                message: "User already exists with this email. Please login.",
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName: fullName.trim(),
            email: normalizedEmail,
            password: hashedPassword,
            role: role || "Author",
            avatar: avatar || "",
        });

        const token = generateToken(user);

        return response.status(201).json({
            success: true,
            message: "User registered successfully",
            token,
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error("Register user error:", error);
        return response.status(500).json({
            success: false,
            message: "User registration failed",
            error: error.message,
        });
    }
};

const login = async (request, response) => {
    try {
        const { email, password } = request.body;

        if (!email || !password) {
            return response.status(400).json({
                success: false,
                message: "Please provide both email and password",
            });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (!existingUser) {
            return response.status(400).json({
                success: false,
                message: "User is not registered. Please signup first.",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return response.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = generateToken(existingUser);

        return response.status(200).json({
            success: true,
            message: "User logged in successfully",
            token,
            user: {
                _id: existingUser._id,
                fullName: existingUser.fullName,
                email: existingUser.email,
                role: existingUser.role,
                avatar: existingUser.avatar,
            },
        });
    } catch (error) {
        console.error("Login error:", error);
        return response.status(500).json({
            success: false,
            message: "User login failed",
            error: error.message,
        });
    }
};

const getProfile = async (request, response) => {
    try {
        const user = await User.findById(request.user._id).select("-password");
        if (!user) {
            return response.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return response.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error("Get profile error:", error);
        return response.status(500).json({
            success: false,
            message: "Failed to fetch user profile",
            error: error.message,
        });
    }
};

const updateProfile = async (request, response) => {
    try {
        const { fullName, avatar } = request.body;

        const updateData = {};
        if (fullName) updateData.fullName = fullName.trim();
        if (avatar !== undefined) updateData.avatar = avatar;

        const updatedUser = await User.findByIdAndUpdate(
            request.user._id,
            updateData,
            { new: true, runValidators: true }
        ).select("-password");

        return response.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Update profile error:", error);
        return response.status(500).json({
            success: false,
            message: "Failed to update profile",
            error: error.message,
        });
    }
};

module.exports = { registerUser, login, getProfile, updateProfile };