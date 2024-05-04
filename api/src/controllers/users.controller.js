import userService from '../services/users.services.js';
import { generateToken } from '../middleware/jwtUtils.js';

export const registerUser = async (req, res) => {
    try {
        const { body } = req;
        const user = await userService.registerUser(body);
        const token = generateToken(user);
        res.status(201).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.loginUser(email, password);
        const token = generateToken(user);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
