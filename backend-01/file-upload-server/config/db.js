const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL || "mongodb://127.0.0.1:27017/fileupload_db")
    .then(() => console.log("MongoDB Database Connected Successfully"))
    .catch((error) => {
        console.log("DB Connection Issues:");
        console.error(error);
        console.log("Proceeding with mock fallback database mode.");
    });
};
