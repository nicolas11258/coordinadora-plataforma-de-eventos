import eventDAO from '../dao/events.dao.js';

const eventService = {
    // Create a new event
    async createEvent(eventData, userId) {
        try {
            eventData.creatorId = userId;
            const newEvent = await eventDAO.createEvent(eventData);
            return newEvent;
        } catch (error) {
            throw new Error('Failed to create event');
        }
    },

    // Get all events
    async getAllEvents() {
        try {
            const events = await eventDAO.findAllEvents();
            return events;
        } catch (error) {
            throw new Error('Failed to get all events');
        }
    },

    // Get an event by its ID
    async getEventById(eventId) {
        try {
            const event = await eventDAO.findEventById(eventId);
            return event;
        } catch (error) {
            throw new Error('Failed to get event by ID');
        }
    },

    // Update an event
    async updateEvent(eventId, eventData) {
        try {
            const updatedEvent = await eventDAO.updateEvent(eventId, eventData);
            return updatedEvent;
        } catch (error) {
            throw new Error('Failed to update event');
        }
    },

    // Delete an event
    async deleteEvent(eventId) {
        try {
            await eventDAO.deleteEvent(eventId);
        } catch (error) {
            throw new Error('Failed to delete event');
        }
    },

    // Register an attendee for an event
    async registerAttendee(eventId, userId) {
        try {
            const event = await eventDAO.findEventById(eventId);
            if (!event) {
                throw new Error('Event not found');
            }
            await eventDAO.registerAttendee(eventId, userId);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Get all attendees of an event
    async getEventAttendees(eventId) {
        try {
            const attendees = await eventDAO.getEventAttendees(eventId);
            return attendees;
        } catch (error) {
            throw new Error('Failed to get event attendees');
        }
    }
};

export default eventService;
