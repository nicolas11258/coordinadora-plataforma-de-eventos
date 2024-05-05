import userDAO from '../dao/users.dao.js';

const userService = {
    // Method to register a new user with securely encrypted password
    /**
     * Registers a new user.
     * @param {Object} userData - User data object containing name, email, and password.
     * @returns {Promise<Object>} A promise that resolves to the newly registered user object.
     * @throws {Error} If registration fails.
     */
    async registerUser(userData) {
        try {
            // TODO: #001: Login security functionality
            const newUser = await userDAO.createUser(userData);
            return newUser;
        } catch (error) {
            throw new Error('Failed to register user');
        }
    },

    // Method to log in with the provided email and securely compare encrypted passwords
    /**
     * Logs in a user.
     * @param {string} email - The email of the user attempting to log in.
     * @param {string} password - The password provided by the user.
     * @returns {Promise<Object>} A promise that resolves to the logged-in user object.
     * @throws {Error} If login fails.
     */    async loginUser(email, password) {
        try {
            const user = await userDAO.findUserByEmail(email);
            if (!user) {
                throw new Error('Invalid credentials');
            }
            // TODO: #001: Login security functionality
            if (!user || user.password !== password) {
                throw new Error('Invalid credentials');
            }
            return user;
        } catch (error) {
            throw new Error('Failed to login user');
        }
    }
};

export default userService;
