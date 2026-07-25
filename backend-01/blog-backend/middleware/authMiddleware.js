const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authMiddleware = async (request, response, next) => {
    try {
        let token;

        if (
            request.headers.authorization &&
            request.headers.authorization.startsWith("Bearer")
        ) {
            token = request.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return response.status(401).json({
                success: false,
                message: "Authentication token missing or invalid",
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded._id) {
            return response.status(401).json({
                success: false,
                message: "User is not authenticated",
            });
        }

        const user = await User.findById(decoded._id).select("-password");
        if (!user) {
            return response.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        request.user = user;
        next();
    } catch (error) {
        console.error("Auth middleware error:", error.message);
        return response.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};

const isAdmin = (request, response, next) => {
    if (request.user && request.user.role === "Admin") {
        return next();
    }
    return response.status(403).json({
        success: false,
        message: "Access denied. Admin privileges required.",
    });
};

const isAuthorOrAdmin = (request, response, next) => {
    if (
        request.user &&
        (request.user.role === "Author" || request.user.role === "Admin")
    ) {
        return next();
    }
    return response.status(403).json({
        success: false,
        message: "Access denied. Author or Admin privileges required.",
    });
};

module.exports = { authMiddleware, isAdmin, isAuthorOrAdmin };