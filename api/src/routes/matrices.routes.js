import express from 'express';
import { calculateAttendeesPerDay } from '../controllers/matrices.controller.js';

const router = express.Router();

// Route to calculate attendees per day
router.post('/', calculateAttendeesPerDay);

export default router;
