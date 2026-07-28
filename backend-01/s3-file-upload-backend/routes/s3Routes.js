const express = require("express");
const router = express.Router();

const {
    uploadToS3,
    uploadAndCompressImageToS3,
    generatePresignedUrl,
    deleteFromS3,
    getAllS3Files
} = require("../controllers/s3Controller");

router.post("/upload", uploadToS3);
router.post("/upload-reduced", uploadAndCompressImageToS3);
router.get("/presigned-url/:key", generatePresignedUrl);
router.delete("/delete/:id", deleteFromS3);
router.get("/files", getAllS3Files);

module.exports = router;
