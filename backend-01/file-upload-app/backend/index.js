const express = require("express");
const app = express();

const cors = require("cors");
const fileupload = require("express-fileupload");
require("dotenv").config();

const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// DB Connection
const db = require("./config/database");
db.connect();

// Cloudinary Connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// Mount Routes
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

// Default Route
app.get("/", (req, res) => {
    res.send(`<h1>Express File Upload & Cloudinary Server</h1><p>Server running on PORT ${PORT}</p>`);
});

// Activate Server
app.listen(PORT, () => {
    console.log(`Server started successfully at PORT ${PORT}`);
});
