const mongoose = require("mongoose");
// const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    },
    originalSize: {
        type: Number,
    },
    reducedSize: {
        type: Number,
    },
    savedPercentage: {
        type: String,
    },
    uploadType: {
        type: String,
        enum: ["local", "image", "video", "reducedImage"],
        default: "image"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Post-save hook to send email notification (Optional enhancement common in this tutorial series)


const File = mongoose.model("File", fileSchema);
module.exports = File;
