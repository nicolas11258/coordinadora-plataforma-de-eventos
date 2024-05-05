import userService from '../services/users.services.js';
import { generateToken } from '../middleware/jwtUtils.js';
import { errorHandler } from '../middleware/errorHandler.js';

/**
 * Registers a new user.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Next middleware function.
 */
export const registerUser = async (req, res, next) => {
    try {
        const { body } = req;
        const user = await userService.registerUser(body);
        const token = generateToken(user);
        res.status(201).json({ user, token });
    } catch (error) {
        next(error);
    }
};

/**
 * Logs in a user.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Next middleware function.
 */
export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        const token = generateToken(user);
        res.status(200).json({ user, token });
    } catch (error) {
        next(error);
    }
};

// Export the error handling middleware
export { errorHandler };
