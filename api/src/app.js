import express from 'express';
import usersRoutes from './routes/users.router.js';
import eventsRoutes from './routes/events.router.js'
import excelRoutes from './routes/excel.router.js'

import config from './config/config.js'
import { errorHandler } from './middleware/errorHandler.js';


const app = express();
const port = config.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(spec))
app.use('/api/user', usersRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/excel', excelRoutes);

app.use(errorHandler);

app.listen(port,()=>console.log("Listening on port " + port));
