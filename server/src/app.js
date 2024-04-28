import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import path, { dirname } from "path";


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

app.use(function (req, res, next) {
    res.set('Cache-Control', 'no-store');
    next();
});
app.use(admin.options.rootPath, adminAuth, adminRouter)
// archivos estaticos 
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const imagesProducts = path.join(__dirname, 'img', 'products');
app.use('/api/img/products', express.static(imagesProducts));
app.use(express.static(path.join(__dirname, "/public")));


console.log(`AdminJS started on http://localhost:${process.env.BACKEND_PORT}${admin.options.rootPath}`)

export default app; // exportamos la aplicación para poder usarla en otros archivos