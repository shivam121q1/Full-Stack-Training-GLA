const express = require("express");
const app = express();
const fileupload = require("express-fileupload");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//etract the file and include in the req with the files
app.use(fileupload(
    {
        useTempFiles: true,
        tempFileDir: '/files'
    }
));


const db = require("./config/db");
db.connect();

// Cloudinary Connection
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);




app.listen(PORT, () => {
    console.log(`Server started successfully at PORT ${PORT}`);
});