const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
    try {
        const response = await mongoose.connect(process.env.MONGODBURL)
        console.log("Database connected successfully")

    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = dbConnect