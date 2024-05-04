import sequelize from '../config/db.js';
import eventModel from './models/events.model.js';

const eventDAO = {
    // Creates a new event in the database.
    async createEvent(eventData) {
        try {
            const newEvent = await eventModel.create(eventData);
            return newEvent;
        } catch (error) {
            console.error('Error creating event:', error);
            throw new Error('Failed to create event');
        }
    },
    
    // Finds an event by its ID in the database.
    async findEventById(eventId) {
        try {
            const event = await eventModel.findByPk(
                eventId, 
                {
                    attributes:[
                        'id', 
                        'title', 
                        'description', 
                        'date', 
                        'location'
                    ]
                }
            );
            return event;
        } catch (error) {
            console.error('Error finding event by ID:', error);
            throw new Error('Failed to find event by ID');
        }
    },
    
    // Updates an event in the database.
    async updateEvent(eventId, newData) {
        try {
            const updatedEvent = await eventModel.update(newData, { where: { id: eventId } });
            return updatedEvent;
        } catch (error) {
            console.error('Error updating event:', error);
            throw new Error('Failed to update event');
        }
    },
    
    // Deletes an event from the database.
    async deleteEvent(eventId) {
        try {
            await sequelize.query('DELETE FROM event_attendee WHERE fk_event_id = :eventId', {
                replacements: { eventId }
            });
            await eventModel.destroy({ where: { id: eventId } });
        } catch (error) {
            console.error('Error deleting event:', error);
            throw new Error('Failed to delete event');
        }
    },
    
    // Finds all events in the database.
    async findAllEvents() {
        try {
            const events = await eventModel.findAll(
                {
                    attributes: [
                        'id', 
                        'title', 
                        'description', 
                        'date', 
                        'location'
                    ]
                }
            );
            return events;
        } catch (error) {
            console.error('Error finding all events:', error);
            throw new Error('Failed to find all events');
        }
    },

    // Registers an attendee for a specific event in the database.
    async registerAttendee(eventId, userId) {
        try {
            const event = await eventModel.findByPk(eventId);
            if (!event) {
                throw new Error('Event not found');
            }
            await event.addAttendee(userId);
            return event;
        } catch (error) {
            console.error('Error registering attendee:', error);
            throw new Error('Failed to register attendee');
        }
    },

    // Gets the attendees of a specific event in the database.
    async getEventAttendees(eventId) {
        try {
            const event = await eventModel.findByPk(eventId);
            if (!event) {
                throw new Error('Event not found');
            }
            const attendees = await event.getAttendees({
                attributes: ['id', 'name', 'email']
            });
            return attendees;
        } catch (error) {
            console.error('Error getting event attendees:', error);
            throw new Error('Failed to get event attendees');
        }
    }
};

export default eventDAO;
