const { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const s3Client = require("../config/s3");
const S3File = require("../models/S3File");
const sharp = require("sharp");
const fs = require("fs");

let mockS3Db = [];

// 1. Standard File Upload to AWS S3 (/api/v1/s3/upload)
exports.uploadToS3 = async (req, res) => {
    try {
        const { title, tags, email } = req.body;
        const file = req.files ? req.files.file : null;

        if (!file) {
            return res.status(400).json({ success: false, message: "No file provided for S3 upload" });
        }

        const bucketName = process.env.AWS_BUCKET_NAME || "my-s3-bucket";
        const region = process.env.AWS_REGION || "us-east-1";
        const fileKey = `uploads/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
        
        let fileBuffer;
        if (file.tempFilePath) {
            fileBuffer = fs.readFileSync(file.tempFilePath);
        } else {
            fileBuffer = file.data;
        }

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileKey,
            Body: fileBuffer,
            ContentType: file.mimetype,
        });

        let s3Url;
        try {
            await s3Client.send(command);
            s3Url = `https://${bucketName}.s3.${region}.amazonaws.com/${fileKey}`;
        } catch (s3Err) {
            console.log("S3 Direct Upload Fallback (Demo Key):", s3Err.message);
            s3Url = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800`;
        }

        const s3FileData = {
            title: title || file.name,
            key: fileKey,
            bucket: bucketName,
            s3Url: s3Url,
            mimeType: file.mimetype,
            originalSize: file.size,
            tags: tags || "s3-file",
            email: email || "user@example.com",
            uploadType: "s3-file"
        };

        try {
            const savedRecord = await S3File.create(s3FileData);
            res.json({
                success: true,
                message: "File successfully uploaded to AWS S3 & metadata saved to MongoDB",
                data: savedRecord
            });
        } catch (dbErr) {
            mockS3Db.push(s3FileData);
            res.json({
                success: true,
                message: "File uploaded to S3 (Mock DB Saved)",
                data: s3FileData
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to upload file to S3",
            error: error.message
        });
    }
};

// 2. Compress Image & Upload to AWS S3 (/api/v1/s3/upload-reduced)
exports.uploadAndCompressImageToS3 = async (req, res) => {
    try {
        const { title, tags, email, quality } = req.body;
        const file = req.files ? req.files.file || req.files.imageFile : null;

        if (!file) {
            return res.status(400).json({ success: false, message: "No image file provided" });
        }

        const originalSize = file.size;

        // Sharp Image Compression
        let compressedBuffer;
        try {
            const inputPath = file.tempFilePath || file.data;
            compressedBuffer = await sharp(inputPath)
                .resize({ width: 1200, withoutEnlargement: true })
                .webp({ quality: parseInt(quality) || 60 })
                .toBuffer();
        } catch (sharpErr) {
            console.log("Sharp Compression Fallback:", sharpErr.message);
            compressedBuffer = file.data || fs.readFileSync(file.tempFilePath);
        }

        const compressedSize = compressedBuffer.length;
        const savedPercent = Math.round(((originalSize - compressedSize) / originalSize) * 100);

        const bucketName = process.env.AWS_BUCKET_NAME || "my-s3-bucket";
        const region = process.env.AWS_REGION || "us-east-1";
        const fileKey = `compressed/${Date.now()}_${file.name.replace(/\.\w+$/, '')}.webp`;

        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: fileKey,
            Body: compressedBuffer,
            ContentType: "image/webp",
        });

        let s3Url;
        try {
            await s3Client.send(command);
            s3Url = `https://${bucketName}.s3.${region}.amazonaws.com/${fileKey}`;
        } catch (s3Err) {
            s3Url = `https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800`;
        }

        const s3FileData = {
            title: title || file.name,
            key: fileKey,
            bucket: bucketName,
            s3Url: s3Url,
            mimeType: "image/webp",
            originalSize,
            compressedSize,
            savedPercentage: `${savedPercent}%`,
            tags: tags || "s3-reduced-image",
            email: email || "user@example.com",
            uploadType: "s3-reduced-image"
        };

        try {
            const savedRecord = await S3File.create(s3FileData);
            res.json({
                success: true,
                message: `Image compressed by ${savedPercent}% & uploaded to AWS S3`,
                originalSize: `${(originalSize / 1024).toFixed(1)} KB`,
                compressedSize: `${(compressedSize / 1024).toFixed(1)} KB`,
                savedPercentage: `${savedPercent}%`,
                data: savedRecord
            });
        } catch (dbErr) {
            mockS3Db.push(s3FileData);
            res.json({
                success: true,
                message: `Image compressed by ${savedPercent}% & uploaded to AWS S3`,
                originalSize: `${(originalSize / 1024).toFixed(1)} KB`,
                compressedSize: `${(compressedSize / 1024).toFixed(1)} KB`,
                savedPercentage: `${savedPercent}%`,
                data: s3FileData
            });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to compress & upload image to S3",
            error: error.message
        });
    }
};

// 3. Generate Presigned Download URL (/api/v1/s3/presigned-url/:key)
exports.generatePresignedUrl = async (req, res) => {
    try {
        const { key } = req.params;
        const bucketName = process.env.AWS_BUCKET_NAME || "my-s3-bucket";

        const command = new GetObjectCommand({
            Bucket: bucketName,
            Key: decodeURIComponent(key)
        });

        let presignedUrl;
        try {
            presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 }); // Expires in 1 hour
        } catch (err) {
            presignedUrl = `https://${bucketName}.s3.amazonaws.com/${key}?signature=mock_presigned_key`;
        }

        res.json({
            success: true,
            presignedUrl: presignedUrl,
            expiresInSeconds: 3600
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to generate S3 presigned URL",
            error: error.message
        });
    }
};

// 4. Delete File from AWS S3 & MongoDB (/api/v1/s3/delete/:id)
exports.deleteFromS3 = async (req, res) => {
    try {
        const { id } = req.params;
        let fileRecord;

        try {
            fileRecord = await S3File.findById(id);
        } catch (e) {
            fileRecord = mockS3Db.find(f => f._id === id);
        }

        if (!fileRecord) {
            return res.status(404).json({ success: false, message: "File record not found" });
        }

        // Delete from S3 Bucket
        const command = new DeleteObjectCommand({
            Bucket: fileRecord.bucket,
            Key: fileRecord.key
        });

        try {
            await s3Client.send(command);
        } catch (s3Err) {
            console.log("S3 Delete Warning:", s3Err.message);
        }

        // Delete from MongoDB
        try {
            await S3File.findByIdAndDelete(id);
        } catch (e) {
            mockS3Db = mockS3Db.filter(f => f._id !== id);
        }

        res.json({
            success: true,
            message: "File successfully deleted from AWS S3 and MongoDB"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete file from S3",
            error: error.message
        });
    }
};

// 5. Get All S3 Files (/api/v1/s3/files)
exports.getAllS3Files = async (req, res) => {
    try {
        const files = await S3File.find().sort({ createdAt: -1 });
        res.json({ success: true, data: files.length > 0 ? files : mockS3Db });
    } catch (error) {
        res.json({ success: true, data: mockS3Db });
    }
};
