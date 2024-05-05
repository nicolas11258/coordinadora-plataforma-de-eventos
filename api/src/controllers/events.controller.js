import eventService from '../services/events.services.js';
import { errorHandler } from '../middleware/errorHandler.js';

/**
 * Handles the creation of a new event.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Next middleware function.
 */
export const createEvent = async (req, res, next) => {
    try {
        const { body, user } = req;
        const event = await eventService.createEvent(body, user);
        res.status(201).json(event);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

/**
 * Handles fetching all events.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Next middleware function.
 */
export const getAllEvents = async (req, res, next) => {
    try {
        const events = await eventService.getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

/**
 * Handles fetching an event by its ID.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Next middleware function.
 */
export const getEventById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const event = await eventService.getEventById(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

/**
 * Handles updating an event.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Next middleware function.
 */
export const updateEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const event = await eventService.updateEvent(id, body);
        res.status(200).json(event);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

/**
 * Handles deleting an event.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Next middleware function.
 */
export const deleteEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user } = req;
        await eventService.deleteEvent(id, user);
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

/**
 * Handles registering an attendee to an event.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Next middleware function.
 */
export const registerAttendee = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { user } = req;
        await eventService.registerAttendee(id, user);
        res.status(200).json({ message: 'Attendee registered successfully' });
    } catch (error) {
        next(error);
    }
};

/**
 * Handles fetching all attendees of an event.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Next middleware function.
 */
export const getEventAttendees = async (req, res, next) => {
    try {
        const { id } = req.params;
        const attendees = await eventService.getEventAttendees(id);
        res.status(200).json(attendees);
    } catch (error) {
        next(error);
    }
};

// Export the error handling middleware
export { errorHandler };
