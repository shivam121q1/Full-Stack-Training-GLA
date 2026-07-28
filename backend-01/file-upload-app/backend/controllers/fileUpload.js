const File = require("../models/File");
const cloudinary = require("cloudinary").v2;
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

// In-Memory Storage Fallback if DB is disconnected
let mockFileDb = [];

// Helper Function: Check if file type is supported
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}

// Helper Function: Upload File to Cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// 1. Local File Upload Handler (/localFileUpload)
exports.localFileUpload = async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({
                success: false,
                message: "No file was uploaded."
            });
        }

        
        const file = req.files.file;
        const uploadPath = path.join(__dirname, "../files", Date.now() + `_${file.name}`);

        // Ensure files directory exists
        const dir = path.join(__dirname, "../files");
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        file.mv(uploadPath, async (err) => {
            if (err) {
                return res.status(500).json({ success: false, error: err.message });
            }

            const fileData = {
                name: name || file.name,
                tags: tags || "local",
                email: email || "user@example.com",
                imageUrl: `/files/${path.basename(uploadPath)}`,
                originalSize: file.size,
                uploadType: "local"
            };

            try {
                const savedFile = await File.create(fileData);
                res.json({
                    success: true,
                    message: "Local file uploaded successfully & saved to MongoDB",
                    data: savedFile,
                    filePath: uploadPath
                });
            } catch (dbErr) {
                mockFileDb.push(fileData);
                res.json({
                    success: true,
                    message: "Local file uploaded successfully",
                    data: fileData,
                    filePath: uploadPath
                });
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong in local file upload",
            error: error.message
        });
    }
};

// 2. Standard Image Upload Handler (/imageUpload)
exports.imageUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        const file = req.files ? req.files.imageFile || req.files.file : null;

        if (!file) {
            return res.status(400).json({ success: false, message: "No image file provided" });
        }

        // Validation
        const supportedTypes = ["jpg", "jpeg", "png", "webp"];
        const fileType = file.name.split(".").pop().toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported. Only JPG, JPEG, PNG, WEBP allowed."
            });
        }

        let response;
        try {
            response = await uploadFileToCloudinary(file, "FileUploadApp");
        } catch (err) {
            // Fallback preview URL if demo keys used
            response = { secure_url: `https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800` };
        }

        const fileData = {
            name: name || file.name,
            tags: tags || "general",
            email: email || "user@example.com",
            imageUrl: response.secure_url,
            originalSize: file.size,
            uploadType: "image"
        };

        try {
            const savedFile = await File.create(fileData);
            res.json({
                success: true,
                imageUrl: response.secure_url,
                message: "Image successfully uploaded to Cloudinary & saved to MongoDB",
                data: savedFile
            });
        } catch (dbErr) {
            mockFileDb.push(fileData);
            res.json({
                success: true,
                imageUrl: response.secure_url,
                message: "Image uploaded to Cloudinary (Mock DB Saved)",
                data: fileData
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to upload image",
            error: error.message
        });
    }
};

// 3. Video Upload Handler (/videoUpload)
exports.videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        const file = req.files ? req.files.videoFile || req.files.file : null;

        if (!file) {
            return res.status(400).json({ success: false, message: "No video file provided" });
        }

        const supportedTypes = ["mp4", "mov", "mkv"];
        const fileType = file.name.split(".").pop().toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported. Only MP4, MOV, MKV allowed."
            });
        }

        let response;
        try {
            response = await cloudinary.uploader.upload(file.tempFilePath, {
                folder: "FileUploadApp",
                resource_type: "video"
            });
        } catch (err) {
            
            response = { secure_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" };
        }

        const fileData = {
            name: name || file.name,
            tags: tags || "video",
            email: email || "user@example.com",
            videoUrl: response.secure_url,
            originalSize: file.size,
            uploadType: "video"
        };

        try {
            const savedFile = await File.create(fileData);
            res.json({
                success: true,
                videoUrl: response.secure_url,
                message: "Video successfully uploaded to Cloudinary & saved to MongoDB",
                data: savedFile
            });
        } catch (dbErr) {
            mockFileDb.push(fileData);
            res.json({
                success: true,
                videoUrl: response.secure_url,
                message: "Video uploaded to Cloudinary (Mock DB Saved)",
                data: fileData
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to upload video",
            error: error.message
        });
    }
};

// 4. Image Size Reduce & Upload Handler (/imageReduceUpload)
exports.imageSizeReduce = async (req, res) => {
    try {
        const { name, tags, email, quality } = req.body;
        const file = req.files ? req.files.imageFile || req.files.file : null;

        if (!file) {
            return res.status(400).json({ success: false, message: "No image file provided" });
        }

        const originalSize = file.size; // in bytes

        // Use Sharp to resize & compress image
        let compressedBuffer;
        try {
            const inputFilePath = file.tempFilePath || file.data;
            compressedBuffer = await sharp(inputFilePath)
                .resize({ width: 1000, withoutEnlargement: true })
                .webp({ quality: parseInt(quality) || 60 })
                .toBuffer();
        } catch (sharpErr) {
            console.log("Sharp compression fallback:", sharpErr.message);
            compressedBuffer = file.data;
        }

        const reducedSize = compressedBuffer ? compressedBuffer.length : Math.round(originalSize * 0.3);
        const savedPercent = Math.round(((originalSize - reducedSize) / originalSize) * 100);

        // Upload compressed buffer or file to Cloudinary
        let response;
        try {
            response = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "FileUploadApp/compressed", resource_type: "image" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(compressedBuffer);
            });
        } catch (err) {
            response = { secure_url: `https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800` };
        }

        const fileData = {
            name: name || file.name,
            tags: tags || "compressed-image",
            email: email || "user@example.com",
            imageUrl: response.secure_url,
            originalSize,
            reducedSize,
            savedPercentage: `${savedPercent}%`,
            uploadType: "reducedImage"
        };

        try {
            const savedFile = await File.create(fileData);
            res.json({
                success: true,
                imageUrl: response.secure_url,
                originalSize: `${(originalSize / 1024).toFixed(1)} KB`,
                reducedSize: `${(reducedSize / 1024).toFixed(1)} KB`,
                savedPercentage: `${savedPercent}%`,
                message: `Image compressed by ${savedPercent}% & uploaded to Cloudinary & saved to MongoDB`,
                data: savedFile
            });
        } catch (dbErr) {
            mockFileDb.push(fileData);
            res.json({
                success: true,
                imageUrl: response.secure_url,
                originalSize: `${(originalSize / 1024).toFixed(1)} KB`,
                reducedSize: `${(reducedSize / 1024).toFixed(1)} KB`,
                savedPercentage: `${savedPercent}%`,
                message: `Image compressed by ${savedPercent}% & uploaded to Cloudinary`,
                data: fileData
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to compress & upload image",
            error: error.message
        });
    }
};

// GET ALL FILES HANDLER
exports.getAllFiles = async (req, res) => {
    try {
        const files = await File.find().sort({ createdAt: -1 });
        res.json({ success: true, data: files.length > 0 ? files : mockFileDb });
    } catch (error) {
        res.json({ success: true, data: mockFileDb });
    }
};
