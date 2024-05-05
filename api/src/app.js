import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import usersRoutes from './routes/users.router.js';
import eventsRoutes from './routes/events.router.js';
import excelRoutes from './routes/excel.router.js';
import matricesRoutes from './routes/matrices.routes.js';
import mapboxRoutes from './routes/mapbox.router.js'

import config from './config/config.js'
import { errorHandler } from './middleware/errorHandler.js';


const app = express();
const port = config.port;

const swaggerOptions = {
    definition: {
    openapi: '3.0.1',
    info: {
        title: 'Documentación de Plataforma para Gestion de Eventos',
        description:
        'Documentación que muestra todo las apis disponibles',
    },
    },
    apis: [`${process.cwd()}/src/docs/**/*.yaml`],
}
const spec = swaggerJSDoc(swaggerOptions)

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(spec))
app.use('/api/user', usersRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/excel', excelRoutes);
app.use('/api/matrices', matricesRoutes);
app.use('/api/mapbox', mapboxRoutes);

app.use(errorHandler);

app.listen(port,()=>console.log("Listening on port " + port));
