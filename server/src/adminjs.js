import bcrypt from "bcryptjs";
import AdminJS, { ComponentLoader, Dashboard } from 'adminjs'
import AdminJSExpress, { name } from '@adminjs/express'
import { Database, Resource, getModelByName } from '@adminjs/prisma'
import { dark, light, noSidebar } from '@adminjs/themes'
import { PrismaClient } from '@prisma/client'
import path from "path";
import { fileURLToPath } from "url";
import Connect from 'connect-pg-simple'
import session from 'express-session'
import jwt from 'jsonwebtoken'
import 'dotenv/config'
import prisma from "./db.js";
import { log } from "console";

const Base_De_datos = new PrismaClient()
AdminJS.registerAdapter({ Database, Resource })


const componentLoader = new ComponentLoader()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo del dashboard personalizado
const dashboardPath = path.resolve(__dirname, './dashboard.jsx');

// Cargar el componente personalizado del dashboard
const Components = {
    Dashboard: componentLoader.add('Dashboard', dashboardPath),
    // other custom components
}

const authenticate = async (req, res) => {
    const { token } = req.cookies;

    if (!token) return null;

    try {
        const user = await jwtVerify(token, process.env.TOKEN_SECRET);
        const userFound = await prisma.USER.findFirst({
            where: {
                Id: user.id
            }
        });

        if (!userFound || userFound.Role !== "ADMINISTRADOR") {
            return null;
        }

        const DEFAULT_ADMIN = {
            email: userFound.Email,
            password: userFound.Password,
        };

        return Promise.resolve(DEFAULT_ADMIN);
    } catch (err) {
        res.status(403).send('Autorizacion denegada');
        return null;
    }
}

const ConnectSession = Connect(session)
  const sessionStore = new ConnectSession({
    conObject: {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production',
    },
    tableName: 'session',
    createTableIfMissing: true,
  })

const adminOptions = {
    assets: {
        styles: ["styles.css"],
    },
    locale: {
        debug: false,
    },
    isDebug: false,
    rootPath: '/admin-crud',
    loginPath: 'https://classic-vision.alhanisespinal.tech/login',
    defaultTheme: light.id,
    availableThemes: [dark, light, noSidebar],
    branding: {
        companyName: 'PANEL CRUD',
        logo: '/logo-horizontal.png',
    },
    dashboard: {
        component: Components.Dashboard,
    },
    pages: {
        Dashboard: {
            label: 'Panel',
            component: Components.Dashboard,
        },
    },
    componentLoader,
    resources: [
        {
            resource: { model: getModelByName('USER'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            if (request.payload.Password) {
                                request.payload.Password = await bcrypt.hash(request.payload.Password, 10);
                            }
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            if (request.payload.Password) {
                                request.payload.Password = await bcrypt.hash(request.payload.Password, 10);
                            }

                            request.payload.Updated_At = new Date();
                            console.log(request.payload);

                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('PERSON'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',

            },
        }, {
            resource: { model: getModelByName('CLIENT'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            console.log(request.payload);
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('SUPPLIER'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('EMPLOYEE'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('SALARY'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
            },
        }, {
            resource: { model: getModelByName('SCHEDULE'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('SCHEDULE_EMPLOYEE'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('PERMISION'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('VACATION'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('CATEGORY'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('PRODUCT'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('INVENTORY'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('APPOINTMENT'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('APPOINTMENT_SOLICITATION'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('SERVICE'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('PURCHASE_QUOTATION'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('PURCHASE_ORDER_DETAILED'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('PURCHASE_ORDER'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('INVOICE_ORDER_PRODUCT_DETAILS'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('INVOICE_ORDER_SERVICE_DETAILS'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        }, {
            resource: { model: getModelByName('INVOICE_ORDER'), client: Base_De_datos },
            options: {
                actions: {
                    new: {
                        before: async (request) => {
                            request.payload.Created_At = new Date();
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                    edit: {
                        before: async (request) => {
                            request.payload.Updated_At = new Date();
                            return request;
                        },
                    },
                },
                properties: {
                    Id: { isVisible: { edit: false, show: true, list: true, filter: true } },
                    Created_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                    Updated_At: { isVisible: { new: false, edit: false, show: true, list: true, filter: true } },
                },
                titleProperty: 'Id',
            },
        },
    ],
};

export const admin = new AdminJS(adminOptions)

export const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
        authenticate,
        cookieName: 'adminjs',
        cookiePassword: 'sessionsecret',
    },
    null,
    {
        store: sessionStore,
        resave: true,
        saveUninitialized: true,
        secret: 'sessionsecret',
        cookie: {
            httpOnly: process.env.NODE_ENV === 'production',
            secure: process.env.NODE_ENV === 'production',
        },
        name: 'adminjs',
    }
)
