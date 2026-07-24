const jwt = require("jsonwebtoken");
const User = require("../models/user.model")

const authMiddleware = async (request, response, next) => {
    try {

        let token;

        if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
            token = request.headers.authorization.split(" ")[1]
        }

        console.log("Token:", token);

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return response.status(401).json({
                success: false,
                message: "user is not authenticated"
            })
        }

        request.user = await User.findById(decoded._id).select("-password");

        next();

    } catch (error) {
        console.log(error)
        response.status(401).json({
            success: false,
            message: "user is not authenticated"
        })

    }
}

module.exports = { authMiddleware }