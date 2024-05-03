import dotenv from 'dotenv';
dotenv.config();

//Configuration object that retrieves environment variables using dotenv.
const config = {
    port: process.env.PORT,
    secretKey: process.env.JWT_SECRET,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASSWORD,
    dbDatabase: process.env.DB_DATABASE,
    mapboxApiKey: process.env.MAPBOX_API_KEY
};

export default config;