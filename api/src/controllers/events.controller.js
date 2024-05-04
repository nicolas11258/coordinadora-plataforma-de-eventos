import eventService from '../services/events.services.js';

export const createEvent = async (req, res) => {
    try {
        const { body, user } = req;
        const event = await eventService.createEvent(body, user);
        res.status(201).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const events = await eventService.getAllEvents();
        res.status(200).json(events);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await eventService.getEventById(id);
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { body } = req;
        const event = await eventService.updateEvent(id, body);
        res.status(200).json(event);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        await eventService.deleteEvent(id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const registerAttendee = async (req, res) => {
    try {
        const { id } = req.params;
        const { user } = req;
        await eventService.registerAttendee(id, user);
        res.status(200).json({ message: 'Attendee registered successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const getEventAttendees = async (req, res) => {
    try {
        const { id } = req.params;
        const attendees = await eventService.getEventAttendees(id);
        res.status(200).json(attendees);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
