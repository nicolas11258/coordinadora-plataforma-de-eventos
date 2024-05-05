import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';
import userModel from './users.model.js';

// Define the Event model
const eventModel = sequelize.define('event', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Unique identifier of the event'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Title of the event'
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        comment: 'Description of the event'
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: 'Date and time of the event'
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Location of the event'
    }
}, {
    tableName: 'user', // Define the table name
    timestamps: true, // Enable timestamps
    updatedAt: 'updated_at', // Specify the name of the 'updated_at' field
    createdAt: 'created_at' // Specify the name of the 'created_at' field
});

// Define associations with other models
eventModel.belongsTo(userModel, { as: 'creator', foreignKey: 'fk_creator_id' }); // Each event belongs to a creator user

eventModel.belongsToMany(userModel, { through: 'event_attendee', as: 'attendees', foreignKey: 'fk_event_id', otherKey: 'fk_user_id' }); // Each event can have many attendees, through the 'event_attendee' join table

export default eventModel;
