import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path, { dirname } from "path";
import 'dotenv/config';

import inventoryRoutes from './routes/inventory.routes.js';
import authRoutes from './routes/auth.routes.js';
import humanResourcesRoutes from './routes/human-resources.routes.js'
import appointmentRoutes from './routes/appointment.routes.js';
import salesRoutes from './routes/sales.routes.js';
import purchasesRoutes from './routes/purchases.routes.js'
import activityLogRoutes from './routes/activity-log.routes.js'
import { adminAuth } from './middlewares/adminAuth.js';
import { admin, adminRouter } from './adminjs.js';
import { fileURLToPath } from 'url';

const app = express();

app.set('trust proxy', 1);
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());


app.use('/api/inventory', inventoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/human-resources', humanResourcesRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/purchases', purchasesRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/activity-log', activityLogRoutes)


app.use(admin.options.rootPath, adminRouter)


// archivos estaticos 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
console.log(__dirname);
const imagesProducts = path.join(__dirname, 'img', 'products');
app.use('/api/img/products', express.static(imagesProducts));
app.use(express.static(path.join(__dirname, "/public")));

function has30DaysPassed() {
    const serialDate = new Date(process.env.SERIAL_DATE);
    const currentDate = new Date();

    // Calcula la diferencia en días entre la fecha actual y la fecha del serial
    const diffInDays = Math.ceil((currentDate - serialDate) / (1000 * 60 * 60 * 24));

    return diffInDays >= 30;
}

const SERIALS = ['CLASSIC-SERIAL-1234', 'CLASSIC-SERIAL-12345', '12345-CLASSIC-SERIAL-1234', '1234-CLASSIC-SERIAL-1234'];

app.get('/api/serial', (req, res) => {
    if (SERIALS.includes(process.env.SERIAL)) {
        console.log(process.env.SERIAL_DATE)
        if (has30DaysPassed()) {
            return res.status(401).send(['Serial expirado']);
        }
        
        return res.send(['Serial valido']);
    }
    res.status(401).send(['Serial invalido']);
});
app.post('/api/serial', (req, res) => {
    console.log(req.body)
    if (!req.body.serial) {
        return res.status(400).send(['Serial no proporcionado']);
    }
    if ( !SERIALS.includes(req.body.serial)) {
        return res.status(401).send(['Serial invalido']);
    }
    process.env.SERIAL = req.body.serial;
    // process.env.SERIAL_DATE = '2024-01-29T05:22:51.627Z';
    process.env.SERIAL_DATE = new Date().toISOString();
    res.status(200).send(['Serial actualizado']);
});


console.log(`AdminJS started on https://localhost:${process.env.BACKEND_PORT}${admin.options.rootPath}`)

export default app; // exportamos la aplicación para poder usarla en otros archivos