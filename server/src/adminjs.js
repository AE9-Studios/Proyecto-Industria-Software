import bcrypt from "bcryptjs";
import AdminJS, { ComponentLoader, Dashboard } from 'adminjs'
import AdminJSExpress, { name } from '@adminjs/express'
import { Database, Resource, getModelByName } from '@adminjs/prisma'
import { dark, light, noSidebar } from '@adminjs/themes'
import { PrismaClient } from '@prisma/client'
import path from "path";
import { fileURLToPath } from "url";
import { debug } from "console";


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



const adminOptions = {
    assets: {
        styles: ["styles.css"],
    },
    locale: {
        debug: false,
    },
    isDebug: false,
    rootPath: '/admin-crud',
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

export const adminRouter = AdminJSExpress.buildRouter(admin)
