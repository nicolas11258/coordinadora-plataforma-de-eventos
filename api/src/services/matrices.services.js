import eventDAO from '../dao/events.dao.js';

const matricesService = {
    // Function to calculate the number of attendees per day of the week for a list of events
    /**
     * Calculate the number of attendees per day of the week for a list of events.
     * @param {Array} events - An array of event IDs for which attendees per day are to be calculated.
     * @returns {Promise<Array>} A promise that resolves to an array containing the number of attendees per day.
     * @throws {Error} If there is an error in calculating attendees per day.
     */
    async calculateAttendeesPerDay(events) {
        try {
            const attendees = await eventDAO.calculateAttendeesPerDay(events);
            return attendees;
        } catch (error) {
            throw new Error('Error calculating attendees per day: ' + error.message);
        }
    },
}

export default matricesService;
