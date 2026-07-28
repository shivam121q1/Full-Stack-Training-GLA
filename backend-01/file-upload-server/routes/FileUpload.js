const express = require("express");
const router = express.Router();

const {
    localFileUpload,
    imageUpload,
    videoUpload,
    imageSizeReduce,
    getAllFiles
} = require("../controller/fileUpload");

// Api Routes matching classroom diagram
router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);
// router.post("/imageSizeReduce", imageSizeReduce);
// router.get("/getAllFiles", getAllFiles);

module.exports = router;
