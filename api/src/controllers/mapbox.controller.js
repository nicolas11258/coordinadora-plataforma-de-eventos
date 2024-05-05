import locationService from '../services/mapbox.service.js';
import { errorHandler } from '../middleware/errorHandler.js';

/**
 * Handles location.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Next middleware function.
 */
export const locationController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const nearbyLocations = await locationService.getNearbyLocations(id);
        if (!nearbyLocations) {
            return res.status(404).json({ error: 'Location not found' });
        }
        res.status(200).json(nearbyLocations);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

// Export the error handling middleware
export { errorHandler };
