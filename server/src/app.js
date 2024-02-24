import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import inventoryRoutes from './routes/inventory.routes.js';
const app = express();

const corsOptions = {
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    headers: 'Origin,X-Requested-With,Content-Type,Accept,Authorization',
};


app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.get('/api/hello', (req, res) => res.send('Hello Worlddddddddddddddd!'));
app.use('/api/inventory', inventoryRoutes);


export default app; // exportamos la aplicación para poder usarla en otros archivos