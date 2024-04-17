import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { Database, Resource, getModelByName } from '@adminjs/prisma'
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcryptjs";

import inventoryRoutes from './routes/inventory.routes.js';
import authRoutes from './routes/auth.routes.js';
import humanResourcesRoutes from './routes/human-resources.routes.js'
import appointmentRoutes from './routes/appointment.routes.js';
import salesRoutes from './routes/sales.routes.js';
import activityLogRoutes from './routes/activity-log.routes.js'
import { adminAuth } from './middlewares/adminAuth.js';

const app = express();

const prisma = new PrismaClient()

AdminJS.registerAdapter({ Database, Resource })

const adminOptions = {
    resources: [{
        resource: { model: getModelByName('USER'), client: prisma },
        options: {
            actions: {
                new: {
                    before: async (request) => {
                        if(request.payload.Password) {
                            request.payload.Password = await bcrypt.hash(request.payload.Password, 10);
                        }
                        return request;
                    },
                },
                edit: {
                    before: async (request) => {
                        if(request.payload.Password) {
                            request.payload.Password = await bcrypt.hash(request.payload.Password, 10);
                        }
                        return request;
                    },
                },
            },
        },
    },{
        resource: { model: getModelByName('PERSON'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('CLIENT'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('SUPPLIER'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('EMPLOYEE'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('SALARY'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('SCHEDULE'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('SCHEDULE_EMPLOYEE'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('PERMISION'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('VACATION'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('CATEGORY'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('PRODUCT'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('INVENTORY'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('APPOINTMENT'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('APPOINTMENT_SOLICITATION'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('SERVICE'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('PURCHASE_QUOTATION'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('PURCHASE_ORDER_DETAILED'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('PURCHASE_ORDER'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('INVOICE_ORDER_PRODUCT_DETAILS'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('INVOICE_ORDER_SERVICE_DETAILS'), client: prisma },
        options: {},
    },{
        resource: { model: getModelByName('INVOICE_ORDER'), client: prisma },
        options: {},
    },


],
};

const admin = new AdminJS(adminOptions)

const adminRouter = AdminJSExpress.buildRouter(admin)

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
app.use('/api/appointment', appointmentRoutes);
app.use('/api/activity-log', activityLogRoutes)

console.log(console.log(`AdminJS started on http://localhost:${process.env.BACKEND_PORT}${admin.options.rootPath}`))

export default app; // exportamos la aplicación para poder usarla en otros archivos