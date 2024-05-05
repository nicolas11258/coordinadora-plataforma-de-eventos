import e from 'express';
import sequelize from '../config/db.js';

const eventDAO = {
    // Creates a new event in the database.
    async createEvent(eventData) {
        try {
            const query = `
                INSERT INTO event (title, description, date, location, fk_creator_id)
                VALUES (:title, :description, :date, :location, :fk_creator_id)
                RETURNING *;
            `;
            const [newEvent] = await sequelize.query(query, {
                replacements: {
                    title: eventData.title,
                    description: eventData.description,
                    date: eventData.date,
                    location: eventData.location,
                    fk_creator_id: eventData.creatorId
                },
                type: sequelize.QueryTypes.INSERT
            });
            return newEvent;
        } catch (error) {
            console.error('Error creating event:', error);
            throw new Error('Failed to create event');
        }
    },
    
    // Finds an event by its ID in the database.
    async findEventById(eventId) {
        try {
            const query = `
                SELECT id, title, description, date, location
                FROM event
                WHERE id = :eventId;
            `;
            const [event] = await sequelize.query(query, {
                replacements: { eventId },
                type: sequelize.QueryTypes.SELECT
            });
            return event;
        } catch (error) {
            console.error('Error finding event by ID:', error);
            throw new Error('Failed to find event by ID');
        }
    },
    
    // Updates an event in the database.
    async updateEvent(eventId, newData) {
        try {
            const query = `
                UPDATE event
                SET title = :title, 
                    description = :description, 
                    date = :date, 
                    location = :location,
                    updated_at = NOW()
                WHERE id = :eventId
                RETURNING *;
            `;
            const [updatedEvent] = await sequelize.query(query, {
                replacements: {
                    eventId,
                    title: newData.title,
                    description: newData.description,
                    date: newData.date,
                    location: newData.location
                },
                type: sequelize.QueryTypes.UPDATE
            });
            return updatedEvent;
        } catch (error) {
            console.error('Error updating event:', error);
            throw new Error('Failed to update event');
        }
    },
    
    // Deletes an event from the database.
    async deleteEvent(eventId, userId) {
        try {

            const [creatorIdResult] = await sequelize.query(
                'SELECT fk_creator_id FROM event WHERE id = :eventId;',
                { replacements: { eventId }}
            );

            const creatorId = creatorIdResult[0]?.fk_creator_id;

            console.log(creatorId)
            if(creatorId !== userId){
                throw new Error("You do not have permission")
            }

            await sequelize.query(
                'DELETE FROM event_attendee WHERE fk_event_id = :eventId', 
                { replacements: { eventId }}
            );
            const query = `
                DELETE FROM event
                WHERE id = :eventId;
            `;
            await sequelize.query(query, {
                replacements: { eventId },
                type: sequelize.QueryTypes.DELETE
            });
        } catch (error) {
            console.error('Error deleting event:', error);
            throw new Error('Failed to delete event');
        }
    },
    
    // Finds all events in the database.
    async findAllEvents() {
        try {
            const query = `
                SELECT id, title, description, date, location
                FROM event;
            `;
            const events = await sequelize.query(query, {
                type: sequelize.QueryTypes.SELECT
            });
            return events;
        } catch (error) {
            console.error('Error finding all events:', error);
            throw new Error('Failed to find all events');
        }
    },

    // Registers an attendee for a specific event in the database.
    async registerAttendee(eventId, userId) {
        try {
            const query = `
                INSERT INTO event_attendee (fk_event_id, fk_user_id)
                VALUES (:eventId, :userId);
            `;
            await sequelize.query(query, {
                replacements: { eventId, userId },
                type: sequelize.QueryTypes.INSERT
            });
        } catch (error) {
            console.error('Error registering attendee:', error);
            throw new Error('Failed to register attendee');
        }
    },

    // Gets the attendees of a specific event in the database.
    async getEventAttendees(eventId) {
        console.log(eventId)
        try {
            const query = `
                SELECT u.id, u.name, u.email
                FROM "user" u
                INNER JOIN event_attendee ea ON u.id = ea.fk_user_id
                INNER JOIN event e ON ea.fk_event_id = e.id
                WHERE e.id = :eventId;
            `;
            const attendees = await sequelize.query(query, {
                replacements: { eventId },
                type: sequelize.QueryTypes.SELECT
            });
            return attendees;
        } catch (error) {
            console.error('Error getting event attendees:', error);
            throw new Error('Failed to get event attendees');
        }
    },
    
    // Calculates attendees per day given a list of event IDs.
    async calculateAttendeesPerDay(eventIds) {
        try {
            const query = `
                SELECT 
                    EXTRACT(WEEK FROM e.date) AS week_number,
                    EXTRACT(DOW FROM e.date) AS day_of_week,
                    COUNT(*) AS attendees_count
                FROM 
                    event e
                JOIN 
                    event_attendee ea ON e.id = ea.fk_event_id
                WHERE 
                    e.id IN (:eventIds)
                GROUP BY 
                    EXTRACT(WEEK FROM e.date),
                    EXTRACT(DOW FROM e.date)
                ORDER BY 
                    week_number, 
                    day_of_week;
            `;
            const listAttendees = await sequelize.query(query, {
                replacements: { eventIds },
                type: sequelize.QueryTypes.SELECT
            });
            return listAttendees;
        } catch (error) {
            console.error('Error calculating attendees per day:', error);
            throw new Error('Failed to get attendees per day');
        }
    }
};

export default eventDAO;
