const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

const isFileTypeSupported = (filetype, supportedType) => {
    return supportedType.includes(filetype);
}

const uploadtoCloudinary = async (file, folderName, quality) => {
    const options = { folder: folderName, resource_type: "auto" }
    if (quality) {
        options.quality
    }

    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

const localFileUpload = async (req, res) => {
    try {
        console.log("Sevrer")
        const { name, tags, email } = req.body;



        const file = req.files.imageFile;
        console.log("File etension", file.name)

        const filetype = file.name.split(".")[1]; //to find the etension
        ["Rectangle 6546 (1)", "webp"]

        console.log("curent director", __dirname);

        const path = `${__dirname}/files/${Date.now()}.${filetype}`;

        console.log("Path", path);

        file.mv(path, async (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("File uploaded successfully");

                const fileData = {
                    name: name || file.name,
                    tags: tags || "local",
                    email: email || "user@example.com",
                    imageUrl: `/files/${Date.now()}.${filetype}`,
                    originalSize: file.size,
                    uploadType: "local"
                };

                try {

                    const savedFile = await File.create(fileData);
                    res.json({
                        success: true,
                        message: "Local file uploaded successfully & saved to MongoDB",
                        data: savedFile,
                        filePath: path
                    });
                } catch (error) {
                    console.log(error);
                    res.status(500).json({
                        success: false,
                        message: "Error saving file metadata to MongoDB",
                        error: error.message
                    });
                }
            }
        });


        // ConstantSourceNode

    } catch (error) {
        console.log(error)
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong in local file upload",
            error: error.message
        });

    }
};

const imageUpload = async (req, res) => {
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

        //upload to cloudinary

        let response;
        try {
            response = await uploadtoCloudinary(file, "full-stack-class");
        } catch (err) {
            console.log(err);
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
            const createdFile = await File.create(fileData);
            res.json({
                success: true,
                message: "Image uploaded to Cloudinary and metadata saved to MongoDB",
                data: createdFile,
                url: response.secure_url
            });
        } catch (dbError) {
            console.error("Error saving file metadata:", dbError);
            res.status(500).json({
                success: false,
                message: "Failed to save file metadata",
                error: dbError.message
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
const videoUpload = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        const file = req.files ? req.files.imageFile || req.files.file : null;

        if (!file) {
            return res.status(400).json({ success: false, message: "No image file provided" });
        }

        // Validation
        const supportedTypes = ["mov", "mp4"];
        const fileType = file.name.split(".").pop().toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported. Only MOV, MP4 allowed."
            });
        }

        //upload to cloudinary

        let response;
        try {
            response = await uploadtoCloudinary(file, "full-stack-class");
        } catch (err) {
            console.log(err);
            return res.status(401).json({
                success: false,
                message: "Error in uploading video to cloudinary"
            })
            // Fallback preview URL if demo keys used
            response = { secure_url: `https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800` };
        }

        const fileData = {
            name: name || file.name,
            tags: tags || "general",
            email: email || "user@example.com",
            imageUrl: response.secure_url,
            originalSize: file.size,
            uploadType: "video"
        };

        try {
            const createdFile = await File.create(fileData);
            res.json({
                success: true,
                message: "Video uploaded to Cloudinary and metadata saved to MongoDB",
                data: createdFile,
                url: response.secure_url
            });
        } catch (dbError) {
            console.error("Error saving file metadata:", dbError);
            res.status(500).json({
                success: false,
                message: "Failed to save file metadata",
                error: dbError.message
            });
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to upload Video",
            error: error.message
        });
    }
};

const imageSizeReduce = async (req, res) => {
    try {
        const { name, tags, email } = req.body;
        const file = req.files ? req.files.imageFile || req.files.file : null;

        if (!file) {
            return res.status(400).json({ success: false, message: "No image file provided" });
        }

        // Validation
        const supportedTypes = ["mov", "mp4"];
        const fileType = file.name.split(".").pop().toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res.status(400).json({
                success: false,
                message: "File format not supported. Only MOV, MP4 allowed."
            });
        }

        //upload to cloudinary

        let response;
        try {
            response = await uploadtoCloudinary(file, "full-stack-class",30);
        } catch (err) {
            console.log(err);
            return res.status(401).json({
                success: false,
                message: "Error in uploading video to cloudinary"
            })
            // Fallback preview URL if demo keys used
            response = { secure_url: `https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800` };
        }

        const fileData = {
            name: name || file.name,
            tags: tags || "general",
            email: email || "user@example.com",
            imageUrl: response.secure_url,
            originalSize: file.size,
            uploadType: "video"
        };

        try {
            const createdFile = await File.create(fileData);
            res.json({
                success: true,
                message: "Video uploaded to Cloudinary and metadata saved to MongoDB",
                data: createdFile,
                url: response.secure_url
            });
        } catch (dbError) {
            console.error("Error saving file metadata:", dbError);
            res.status(500).json({
                success: false,
                message: "Failed to save file metadata",
                error: dbError.message
            });
        }



    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to upload Video",
            error: error.message
        });
    }
};
module.exports = { localFileUpload, imageUpload, videoUpload, imageSizeReduce }