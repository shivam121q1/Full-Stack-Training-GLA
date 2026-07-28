const mongoose = require("mongoose");

const s3FileSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    bucket: {
        type: String,
        required: true
    },
    s3Url: {
        type: String,
        required: true
    },
    mimeType: {
        type: String
    },
    originalSize: {
        type: Number
    },
    compressedSize: {
        type: Number
    },
    savedPercentage: {
        type: String
    },
    tags: {
        type: String
    },
    email: {
        type: String
    },
    uploadType: {
        type: String,
        enum: ["s3-file", "s3-reduced-image", "s3-presigned"],
        default: "s3-file"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("S3File", s3FileSchema);
