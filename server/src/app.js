import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';


import inventoryRoutes from './routes/inventory.routes.js';
import authRoutes from './routes/auth.routes.js';
import humanResourcesRoutes from './routes/human-resources.routes.js'
import appointmentRoutes from './routes/appointment.routes.js';
import salesRoutes from './routes/sales.routes.js';
import purchasesRoutes from './routes/purchases.routes.js'
import activityLogRoutes from './routes/activity-log.routes.js'
import { adminAuth } from './middlewares/adminAuth.js';
import { admin, adminRouter } from './libs/adminjs.js';

const app = express();



app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded());

app.use(admin.options.rootPath, adminAuth, adminRouter)
app.use('/api/inventory', inventoryRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/human-resources', humanResourcesRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/purchases', purchasesRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/activity-log', activityLogRoutes)

console.log(`AdminJS started on http://localhost:${process.env.BACKEND_PORT}${admin.options.rootPath}`)

export default app; // exportamos la aplicación para poder usarla en otros archivos