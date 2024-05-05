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

// Route to create a new event
router.post('/', authToken, createEvent);

// Route to get all events
router.get('/', authToken, getAllEvents);

// Route to get an event by its ID
router.get('/:id', authToken, getEventById);

// Route to update an event by its ID
router.put('/:id', authToken, updateEvent);

// Route to delete an event by its ID
router.delete('/:id', authToken, deleteEvent);

// Route to register an attendee to an event
router.post('/:id/register', authToken, registerAttendee);

// Route to get all attendees of an event by its ID
router.get('/:id/attendees', authToken, getEventAttendees);

export default router;
