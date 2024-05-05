import excelService from '../services/excel.services.js';
import { errorHandler } from '../middleware/errorHandler.js';

/**
 * Handles the upload and processing of Events file.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Next middleware function.
 */
export const addListEvents = async (req, res, next) => {
    try {
        const { file, user } = req;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = file.path;

        // Call the service to process the Excel file
        const result = await excelService.addListEvents(filePath, user);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

/**
 * Handles the upload and processing of Attendees file.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Next middleware function.
 */
export const addListAttendees = async (req, res, next) => {
    try {
        const { file } = req;
        if (!file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filePath = file.path;

        // Call the service to process the Excel file
        const result = await excelService.addListAttendees(filePath);

        return res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

// Export the error handling middleware
export { errorHandler };
