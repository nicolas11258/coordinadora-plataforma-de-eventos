import { Sequelize } from 'sequelize';
import config from './config.js'

// Initializes a Sequelize instance to connect to a PostgreSQL database.
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: config.dbHost,
    username: config.dbUser,
    password: config.dbPass,
    database: config.dbDatabase,
});

export default sequelize;