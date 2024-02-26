import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import inventoryRoutes from './routes/inventory.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

const corsOptions = {
    origin: ['http://192.168.0.3/5173', 'http://http://192.168.0.3/4173', 'http://172.21.32.1/5173', 'http://http://172.21.32.1/4173', 'http://0.0.0.0:5173', 'http://0.0.0.0:4173', 'http://localhost:5173', 'http://localhost:4173', 'http://nginx:8000', 'http://0.0.0.0:8000', 'http://front-end:5173', 'http://front-end:5173'],
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    headers: 'Access-Control-Allow-Headers,Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept'
};



app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.use('/api/inventory', inventoryRoutes);
app.use('/api/auth', authRoutes);



export default app; // exportamos la aplicación para poder usarla en otros archivos