const { response } = require("express");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/generateToken");

const registerUser = async (request, response) => {
    try {
        const { fullName, email, password } = request.body;

        if (!fullName || !email || !password) {
            return response.status(400).json({
                success: false,
                message: "fill the complete details",
            })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return response.status(400).json({
                success: false,
                message: "user already exists, Please login",
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword
        })

        //create or save 

        response.status(201).json({
            success: true,
            message: "User has cretaed sucessfull",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role,
            }
        })
        //step to follow 

    } catch (error) {
        console.log(error);
        return response.status(500).json({
            success: false,
            message: "user creation failed",
        })

    }
}


const login = async (request, response) => {
    try {
        const { email, password } = request.body;

        console.log("Email and password is", email, password)

        if (!email || !password) {
            return response.status(400).json({
                success: false,
                message: "Please provide your credentials"
            })
        }

        console.log("email and password is", email, password);

        const existingUser = await User.findOne({ email });

        console.log("Existing user is", existingUser);
        if (!existingUser) {
            return response.status(400).json({
                success: false,
                message: "User is not registered, Please signup first",
            })
        }

        console.log("bcrypt hash password", bcrypt.hash(existingUser.password, password))
        if (!bcrypt.compare(existingUser.password, password)) {
            return response.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }

        const token = generateToken(existingUser);

        console.log("user is logged in successfully", existingUser)
        return response.status(200).json({
            success: true,
            message: "User logged in successfully",
            user: {
                token: token,
                _id: existingUser._id,
                fullName: existingUser.fullName,
                email: existingUser.email,
                role: existingUser.role,
            }
        })

    } catch (error) {
        console.log(error);
        return response.status(500).json({
            success: false,
            message: "user login failed",
        })

    }
}

module.exports = { registerUser, login };