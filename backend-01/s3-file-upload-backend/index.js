const express = require("express");
const app = express();

const cors = require("cors");
const fileupload = require("express-fileupload");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// MongoDB Connection
const db = require("./config/database");
db.connect();

// Mount AWS S3 Routes
const s3Routes = require("./routes/s3Routes");
app.use("/api/v1/s3", s3Routes);

// Default Root Route
app.get("/", (req, res) => {
    res.send(`<h1>AWS S3 File Upload Backend API</h1><p>Server running on PORT ${PORT}</p>`);
});

// Start Server
app.listen(PORT, () => {
    console.log(`AWS S3 Backend Server running on PORT ${PORT}`);
});
