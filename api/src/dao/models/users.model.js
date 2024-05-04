import { DataTypes } from 'sequelize';
import sequelize from '../../config/db.js';

const userModel = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'Unique identifier of the user'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Name of the user'
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'Email address of the user'
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Password of the user'
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: 'Timestamp of user creation'
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: 'Timestamp of user update'
    }
},{
    tableName: 'user',
    timestamps: true,
    updatedAt: 'updated_at',
    createdAt: 'created_at'
});

export default userModel;
