import express from 'express';
import config from './config/config.js'

const app = express();
const port = config.port;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port,()=>console.log("Listening on port"));
