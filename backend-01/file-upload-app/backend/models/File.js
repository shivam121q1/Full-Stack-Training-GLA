const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

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
fileSchema.post("save", async function(doc) {
    try {
        if (!doc.email || doc.email.includes("example.com")) return;

        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let info = await transporter.sendMail({
            from: `File Uploader <${process.env.MAIL_USER}>`,
            to: doc.email,
            subject: "New File Uploaded to Cloudinary",
            html: `<h2>File Uploaded Successfully</h2><p>View your file: <a href="${doc.imageUrl || doc.videoUrl}">${doc.imageUrl || doc.videoUrl}</a></p>`,
        });

        console.log("Email Notification Sent:", info.messageId);
    } catch (error) {
        console.log("Email Transporter Error (Skipped):", error.message);
    }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
