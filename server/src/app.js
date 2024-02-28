import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import inventoryRoutes from './routes/inventory.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.use('/api/inventory', inventoryRoutes);
app.use('/api/auth', authRoutes);



export default app; // exportamos la aplicación para poder usarla en otros archivos