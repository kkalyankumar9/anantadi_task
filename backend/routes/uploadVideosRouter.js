const express = require("express");
const path = require("path");
const multer = require("multer");


const { VideoModel } = require("../models/videoModel");
const { authMid } = require("../middleware/authMid");

const videosUploadRouter = express.Router();

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/videos"); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

// Initialize Multer
const upload = multer({ storage });

videosUploadRouter.post("/video_upload",authMid, upload.single("video"), async (req, res) => {
    const { title, description, tags } = req.body;
    const username = req.user?.username;
   
 console.log(req.body)
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }
        const video = new VideoModel({
            title,
            description,
            tags: tags ? tags.split(",") : [], 
            filePath: req.file.path, 
            fileSize: req.file.size, 
            uploadedAt: new Date(),
            username
        });

        await video.save();

        res.status(201).json({ message: "Video uploaded successfully", video });
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

module.exports = { videosUploadRouter };
