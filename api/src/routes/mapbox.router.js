import express from 'express';
import { locationController } from '../controllers/mapbox.controller.js';

const router = express.Router();

// Route to get nearby locations
router.get('/:id', locationController);

export default router;
