import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.get('/api', (req, res) => res.send('Hello Worlddddddddddddddd!'));

export default app; // exportamos la aplicación para poder usarla en otros archivos