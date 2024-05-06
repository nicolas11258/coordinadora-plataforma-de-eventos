import sequelize from '../config/db.js';
import userModel from './models/users.model.js'; 

const userDAO = {
    // Creates a new user in the database.
    async createUser(userData) {
        try {
            const newUser = await userModel.create(userData);
            return newUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw new Error('Failed to create user');
        }
    },
    
    // Finds a user by their ID in the database.
    async findUserById(userId) {
        try {
            const user = await userModel.findByPk(userId, {
                attributes: ['id', 'name', 'email']
            });
            return user;
        } catch (error) {
            console.error('Error finding user by ID:', error);
            throw new Error('Failed to find user by ID');
        }
    },

    // Finds a user by their email address in the database.
    async findUserByEmail(email) {
        try {
            const user = await userModel.findOne({ 
                where: { email } ,
            });
            return user;
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw new Error('Failed to find user by email');
        }
    },
    
    // Updates a user in the database.
    async updateUser(userId, newData) {
        try {
            const updatedUser = await userModel.update(newData, { where: { id: userId } });
            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error);
            throw new Error('Failed to update user');
        }
    },
    
    // Deletes a user from the database.
    async deleteUser(userId) {
        try {
            await sequelize.query('DELETE FROM event_attendee WHERE fk_user_id = :userId', {
                replacements: { userId }
            });
            await userModel.destroy({ where: { id: userId } });
        } catch (error) {
            console.error('Error deleting user:', error);
            throw new Error('Failed to delete user');
        }
    },
    
    // Finds all users in the database.
    async findAllUsers() {
        try {
            const users = await userModel.findAll({
                attributes: ['id', 'name', 'email']
            });
            return users;
        } catch (error) {
            console.error('Error finding all users:', error);
            throw new Error('Failed to find all users');
        }
    }
};

export default userDAO;
