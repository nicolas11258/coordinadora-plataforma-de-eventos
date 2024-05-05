import fs from 'fs';
import express from 'express';
import multer from 'multer';
import { authToken } from '../middleware/jwtUtils.js';
import { addListAttendees, addListEvents } from '../controllers/excel.controller.js';

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = 'uploads/';
        fs.access(uploadDir, (err) => {
            if (err) {
                fs.mkdir(uploadDir, { recursive: true }, (err) => {
                    if (err) {
                        console.error('Error creating destination directory:', err);
                        return cb(err);
                    }
                    cb(null, uploadDir);
                });
            } else {
                cb(null, uploadDir);
            }
        });
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

const router = express.Router();

// Route to upload and process events files
router.post('/events', authToken, upload.single('excelFile'), addListEvents);

// Route to upload and process attendees files
router.post('/attendees', authToken, upload.single('excelFile'), addListAttendees);

export default router;
