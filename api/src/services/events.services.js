import eventDAO from '../dao/events.dao.js';

const eventService = {
    // Create a new event
    /**
     * Create a new event.
     * @param {Object} eventData - Data of the event to be created.
     * @param {number} userId - ID of the user creating the event.
     * @returns {Promise<Object>} A promise that resolves to the newly created event.
     * @throws {Error} If there is an error in creating the event.
     */
    async createEvent(eventData, userId) {
        try {
            eventData.creatorId = userId;
            // Create the event in the database
            const newEvent = await eventDAO.createEvent(eventData);
            return newEvent;
        } catch (error) {
            throw new Error('Failed to create event');
        }
    },

    // Get all events
    /**
     * Get all events.
     * @returns {Promise<Array>} A promise that resolves to an array of all events.
     * @throws {Error} If there is an error in getting all events.
     */
    async getAllEvents() {
        try {
            // Retrieve all events from the database
            const events = await eventDAO.findAllEvents();
            return events;
        } catch (error) {
            throw new Error('Failed to get all events');
        }
    },

    // Get an event by its ID
    /**
     * Get an event by its ID.
     * @param {number} eventId - ID of the event to be retrieved.
     * @returns {Promise<Object|null>} A promise that resolves to the event if found, otherwise null.
     * @throws {Error} If there is an error in getting the event by ID.
     */
    async getEventById(eventId) {
        try {
            // Retrieve the event from the database by its ID
            const event = await eventDAO.findEventById(eventId);
            return event;
        } catch (error) {
            throw new Error('Failed to get event by ID');
        }
    },

    // Update an event
    /**
     * Update an event.
     * @param {number} eventId - ID of the event to be updated.
     * @param {Object} eventData - Updated data for the event.
     * @returns {Promise<Object>} A promise that resolves to the updated event.
     * @throws {Error} If there is an error in updating the event.
     */
    async updateEvent(eventId, eventData) {
        try {
            // Update the event in the database
            const updatedEvent = await eventDAO.updateEvent(eventId, eventData);
            return updatedEvent;
        } catch (error) {
            throw new Error('Failed to update event');
        }
    },

    // Delete an event
    /**
     * Delete an event.
     * @param {number} eventId - ID of the event to be deleted.
     * @throws {Error} If there is an error in deleting the event.
     */
    async deleteEvent(eventId, userId) {
        try {
            // Delete the event from the database
            await eventDAO.deleteEvent(eventId, userId);
        } catch (error) {
            throw new Error('Failed to delete event');
        }
    },

    // Register an attendee for an event
    /**
     * Register an attendee for an event.
     * @param {number} eventId - ID of the event.
     * @param {number} userId - ID of the user to be registered as an attendee.
     * @throws {Error} If there is an error in registering the attendee.
     */
    async registerAttendee(eventId, userId) {
        try {
            // Find the event by its ID
            const event = await eventDAO.findEventById(eventId);
            if (!event) {
                throw new Error('Event not found');
            }
            // Register the attendee for the event in the database
            await eventDAO.registerAttendee(eventId, userId);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Get all attendees of an event
    /**
     * Get all attendees of an event.
     * @param {number} eventId - ID of the event.
     * @returns {Promise<Array>} A promise that resolves to an array of all attendees of the event.
     * @throws {Error} If there is an error in getting event attendees.
     */
    async getEventAttendees(eventId) {
        try {
            // Retrieve all attendees of the event from the database
            const attendees = await eventDAO.getEventAttendees(eventId);
            return attendees;
        } catch (error) {
            throw new Error('Failed to get event attendees');
        }
    }
};

export default eventService;
