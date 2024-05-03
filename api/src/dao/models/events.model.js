import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';
import userModel from './users.model.js';

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
},{
    tableName: 'event',
    timestamps: true,
    updatedAt: 'updated_at'
});

eventModel.belongsTo(userModel, { as: 'creator', foreignKey: 'fk_creator_id' });

eventModel.belongsToMany(userModel, { through: 'event_attendee', as: 'attendees' });

export default eventModel;
