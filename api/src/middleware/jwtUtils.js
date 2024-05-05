import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import { errorHandler } from './errorHandler.js';

const secretKey = config.secretKey;

/**
 * Generates a JWT token for the provided user.
 * @param {Object} user - User object.
 * @returns {string} - JWT token.
 */
export const generateToken = (user) => {
    const token = jwt.sign({ user }, secretKey, { expiresIn: '1h' });
    return token;
};

/**
 * Middleware to authenticate user's access using JWT token.
 * @param {Object} req - HTTP request object.
 * @param {Object} res - HTTP response object.
 * @param {Function} next - Next middleware function.
 */
export const authToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error('Unauthorized');
        }
        const token = authHeader.split(' ')[1];
        jwt.verify(token, secretKey, (error, credentials) => {
            if (error) {
                throw new Error('Unauthorized');
            }
            req.user = credentials.user.id;
            next();
        });
    } catch (error) {
        errorHandler(error, req, res, next);
    }
};
