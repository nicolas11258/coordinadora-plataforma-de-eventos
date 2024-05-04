import express from 'express';
import { 
    createEvent, 
    getAllEvents, 
    getEventById, 
    updateEvent, 
    deleteEvent, 
    registerAttendee, 
    getEventAttendees
} from '../controllers/events.controller.js';
import { authToken } from '../middleware/jwtUtils.js';

const router = express.Router();

router.post('/', authToken, createEvent);
router.get('/', authToken, getAllEvents);
router.get('/:id', authToken, getEventById);
router.put('/:id', authToken, updateEvent);
router.delete('/:id', authToken, deleteEvent);
router.post('/:id/register', authToken, registerAttendee);
router.get('/:id/attendees', authToken, getEventAttendees);

export default router;
