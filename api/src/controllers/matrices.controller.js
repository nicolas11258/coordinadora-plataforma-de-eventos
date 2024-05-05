import matricesService from '../services/matrices.services.js';
import { errorHandler } from '../middleware/errorHandler.js';

/**
 * Calculate the number of attendees per day for a list of event IDs.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Next middleware function.
 */
export async function calculateAttendeesPerDay(req, res, next) {
    try {
        // Check if event IDs were provided in the request body
        if (!req.body.eventIds || !Array.isArray(req.body.eventIds)) {
            throw new Error("A valid list of event IDs is required in the request body.");
        }

        const eventIds = req.body.eventIds;
        const results = await matricesService.calculateAttendeesPerDay(eventIds);

        // Send JSON response with the results to the client
        res.json(results);
    } catch (error) {
        next(error);
    }
}

// Export the error handling middleware
export { errorHandler };
