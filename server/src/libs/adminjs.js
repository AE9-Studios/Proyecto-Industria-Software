import bcrypt from "bcryptjs";

import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import { Database, Resource, getModelByName } from '@adminjs/prisma'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
AdminJS.registerAdapter({ Database, Resource })


const adminOptions = {
    branding: {
        companyName: 'PANEL CRUD',
    },
    resources: [{
        resource: { model: getModelByName('USER'), client: prisma },
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
        resource: { model: getModelByName('PERSON'), client: prisma },
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
        resource: { model: getModelByName('CLIENT'), client: prisma },
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
        resource: { model: getModelByName('SUPPLIER'), client: prisma },
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
        resource: { model: getModelByName('EMPLOYEE'), client: prisma },
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
        resource: { model: getModelByName('SALARY'), client: prisma },
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
        resource: { model: getModelByName('SCHEDULE'), client: prisma },
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
        resource: { model: getModelByName('SCHEDULE_EMPLOYEE'), client: prisma },
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
        resource: { model: getModelByName('PERMISION'), client: prisma },
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
        resource: { model: getModelByName('VACATION'), client: prisma },
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
        resource: { model: getModelByName('CATEGORY'), client: prisma },
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
        resource: { model: getModelByName('PRODUCT'), client: prisma },
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
        resource: { model: getModelByName('INVENTORY'), client: prisma },
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
        resource: { model: getModelByName('APPOINTMENT'), client: prisma },
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
        resource: { model: getModelByName('APPOINTMENT_SOLICITATION'), client: prisma },
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
        resource: { model: getModelByName('SERVICE'), client: prisma },
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
        resource: { model: getModelByName('PURCHASE_QUOTATION'), client: prisma },
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
        resource: { model: getModelByName('PURCHASE_ORDER_DETAILED'), client: prisma },
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
        resource: { model: getModelByName('PURCHASE_ORDER'), client: prisma },
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
        resource: { model: getModelByName('INVOICE_ORDER_PRODUCT_DETAILS'), client: prisma },
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
        resource: { model: getModelByName('INVOICE_ORDER_SERVICE_DETAILS'), client: prisma },
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
        resource: { model: getModelByName('INVOICE_ORDER'), client: prisma },
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
