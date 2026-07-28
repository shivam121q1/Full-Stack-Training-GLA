const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/s3_fileupload_db")
    .then(() => console.log("MongoDB Database Connected Successfully for S3 Backend"))
    .catch((error) => {
        console.log("DB Connection Warning (S3 Backend):", error.message);
        console.log("Using mock database storage fallback.");
    });
};
