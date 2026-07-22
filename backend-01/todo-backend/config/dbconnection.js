const mongoose = require("mongoose");

async function dbConnect() {
    try {
        const response = await mongoose.connect("mongodb://localhost:27017/todo");
        console.log("Database connected successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = dbConnect;