const express = require("express");
const cors = require("cors");
require("dotenv").config();

const dbConnect = require("./config/dbConnect");

const authRoutes = require("./routes/auth.router.js");
const blogRoutes = require("./routes/blog.router.js");
const commentRoutes = require("./routes/comment.router.js");
const userRoutes = require("./routes/user.router.js");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
dbConnect();

// Middlewares
app.use(cors("http://localhost:5173", "http://localhost:5174"));
app.use(express.json());

// API Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/comments", commentRoutes);
app.use("/api/v1/users", userRoutes);

// Root Health Check Route
app.get("/", (request, response) => {
    response.send("<h1>Welcome to the Blog Backend API</h1>");
});

// 404 Handler
app.use((request, response, next) => {
    response.status(404).json({
        success: false,
        message: `Route not found: ${request.originalUrl}`,
    });
});

// Global Error Handling Middleware
app.use((error, request, response, next) => {
    console.error("Global Error Handler:", error);
    response.status(error.status || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

