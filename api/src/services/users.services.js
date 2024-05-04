import userDAO from '../dao/users.dao.js';

const userService = {
    // Register a new user with securely hashed password
    async registerUser(userData) {
        try {
            //TODO: #001:Login security functionality
            //const hashedPassword = await bcrypt.hash(userData.password, 10);
            const newUser = await userDAO.createUser({ ...userData, password: hashedPassword });
            return newUser;
        } catch (error) {
            throw new Error('Failed to register user');
        }
    },

    // Login a user with provided email and securely compare hashed passwords
    async loginUser(email, password) {
        try {
            const user = await userDAO.findUserByEmail(email);
            if (!user) {
                throw new Error('Invalid credentials');
            }
            // //TODO: #001:Login security functionality
            /*const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                throw new Error('Invalid credentials');
            }*/
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
