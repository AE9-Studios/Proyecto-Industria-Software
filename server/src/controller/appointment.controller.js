import prisma from "../db.js";
import { http500 } from "../libs/handleErrors.js";


export const createAppointmentSolicitation = async (req, res) => {
    const { date, description, clientId } = req.body;
    try {
        const findClient = await prisma.cLIENT.findFirst({
            where: {
                User_Fk: parseInt(clientId)
            }
        });
        if (!findClient) return res.status(400).json(["El cliente no existe"]);

        const newAppointment = await prisma.aPPOINTMENT_SOLICITATION.create({
            data: {
                Date: new Date(date),
                Description: description,
                Client_Fk: parseInt(clientId),
                State: 'PENDIENTE'
            }
        });
        res.status(200).json(newAppointment);
    } catch (error) {
        return http500(error, req, res);

    }
}

export const updateAppointmentSolicitation = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
    try {
        const appointment = await prisma.aPPOINTMENT_SOLICITATION.update({
            where: {
                Id: parseInt(id)
            },
            data: {
                State: state
            }
        });
        res.json(appointment);
    } catch (error) {
        return http500(error, req, res);

    }
}

export const deleteAppointmentSolicitation = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await prisma.aPPOINTMENT_SOLICITATION.delete({
            where: {
                Id: parseInt(id)
            }
        });
        res.json(appointment);
    } catch (error) {
        return http500(error, req, res);
    }
}

export const getAppointmentsSolicitation = async (req, res) => {
    try {
        const appointments = await prisma.aPPOINTMENT_SOLICITATION.findMany({
            include: {
                Client: {
                    select: {
                        Id: true,
                        Person: {
                            select: {
                                Id: true,
                                First_Name: true,
                                Last_Name: true,
                                DNI: true,
                                Phone_Number: true,
                                Gender: true,
                            }
                        },
                        User: {
                            select: {
                                Id: true,
                                Email: true
                            }

                        }
                    }
                }
            }
        });
        res.json(appointments);
    } catch (error) {
        return http500(error, req, res);

    }
}


export const createAppointment = async (req, res) => {
    const { appointmentSolicitationId, clientId, description, employeeId, state, date } = req.body;

    // Convertir la fecha a un objeto Date
    const startDate = new Date(date);

    // Crear una nueva fecha que sea 30 minutos después
    const endDate = new Date(startDate.getTime() + 30 * 60 * 1000);

    const findAppointInHour = await prisma.aPPOINTMENT.findFirst({
        where: {
            Date: {
                gte: startDate,
                lt: endDate
            },
            Employee_Fk: employeeId
        }
    });

    console.log(findAppointInHour);

    if (findAppointInHour) return res.status(400).json(["Ya existe una cita en esa hora"]);

    try {
        const newAppointment = await prisma.aPPOINTMENT.create({
            data: {
                Date: date, // Convert the date to ISO-8601 format
                Description: description,
                Client_Fk: clientId,
                Employee_Fk: employeeId,
                State: "PENDIENTE"
            }
        });

        const appointmentSolicitation = await prisma.aPPOINTMENT_SOLICITATION.update({
            where: {
                Id: appointmentSolicitationId
            },
            data: {
                State: state
            }
        });

        res.json({
            newAppointment,
            appointmentSolicitation
        });
    } catch (error) {
        return http500(error, req, res);

    }
}

export const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
    try {
        const appointment = await prisma.aPPOINTMENT.update({
            where: {
                Id: parseInt(id)
            },
            data: {
                State: state
            }
        });
        res.json(appointment);
    } catch (error) {
        return http500(error, req, res);
    }
}

export const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await prisma.aPPOINTMENT.delete({
            where: {
                Id: parseInt(id)
            }
        });
        res.json(appointment);
    } catch (error) {
        return http500(error, req, res);
    }
}



export const getAppointments = async (req, res) => {
    try {
        const appointments = await prisma.aPPOINTMENT.findMany({
            include: {
                Employee: {
                    select: {
                        Id: true,
                        Person: {
                            select: {
                                Id: true,
                                First_Name: true,
                                Last_Name: true,
                                DNI: true,
                                Phone_Number: true,
                            }
                        },
                        User: {
                            select: {
                                Id: true,
                                Email: true
                            }
                        }
                    }
                },
                Client: {
                    select: {
                        Id: true,
                        Person: {
                            select: {
                                Id: true,
                                First_Name: true,
                                Last_Name: true,
                                DNI: true,
                                Phone_Number: true,
                            }
                        },
                        User: {
                            select: {
                                Id: true,
                                Email: true
                            }
                        }
                    }
                }
            }
        });
        res.json(appointments);
    } catch (error) {
        return http500(error, req, res);
    }
}


export const getAppointmentsSolicitationToClient = async (req, res) => {
    const { id } = req.params;
    try {
        const appointments = await prisma.aPPOINTMENT_SOLICITATION.findMany({
            where: {
                Client_Fk: parseInt(id)
            },
            include: {
                Client: {
                    select: {
                        Id: true,
                        Person: {
                            select: {
                                Id: true,
                                First_Name: true,
                                Last_Name: true,
                                DNI: true,
                                Phone_Number: true,
                            }
                        },
                        User: {
                            select: {
                                Id: true,
                                Email: true
                            }
                        }
                    }
                }
            }

        });
        res.json(appointments);
    } catch (error) {
        return http500(error, req, res);

    }
}

export const getAppointmentToClient = async (req, res) => {
    const { id } = req.params;
    try {
        const appointments = await prisma.aPPOINTMENT.findMany({
            where: {
                Client_Fk: parseInt(id)
            },
            include: {
                Employee: {
                    select: {
                        Id: true,
                        Person: {
                            select: {
                                Id: true,
                                First_Name: true,
                                Last_Name: true,
                                DNI: true,
                                Phone_Number: true,
                            }
                        },
                        User: {
                            select: {
                                Id: true,
                                Email: true
                            }
                        }
                    }
                },
                Client: {
                    select: {
                        Id: true,
                        Person: {
                            select: {
                                Id: true,
                                First_Name: true,
                                Last_Name: true,
                                DNI: true,
                                Phone_Number: true,
                            }
                        },
                        User: {
                            select: {
                                Id: true,
                                Email: true
                            }
                        }
                    }
                }
            }
        });
        res.json(appointments);
    } catch (error) {
        return http500(error, req, res);

    }
}

export const getAppointmentToEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const appointments = await prisma.aPPOINTMENT.findMany({
            where: {
                Employee_Fk: parseInt(id)
            },
            include: {
                Employee: {
                    select: {
                        Id: true,
                        Person: {
                            select: {
                                Id: true,
                                First_Name: true,
                                Last_Name: true,
                                DNI: true,
                                Phone_Number: true,
                            }
                        },
                        User: {
                            select: {
                                Id: true,
                                Email: true
                            }
                        }
                    }
                },
                Client: {
                    select: {
                        Id: true,
                        Person: {
                            select: {
                                Id: true,
                                First_Name: true,
                                Last_Name: true,
                                DNI: true,
                                Phone_Number: true,
                            }
                        },
                        User: {
                            select: {
                                Id: true,
                                Email: true
                            }
                        }
                    }
                }
            }
        });
        res.json(appointments);
    } catch (error) {
        return http500(error, req, res);

    }
}

export const getAppointmentsSolicitationToEmployee = async (req, res) => {
    const { id } = req.params;
    try {
        const appointments = await prisma.aPPOINTMENT_SOLICITATION.findMany({
            where: {
                Employee_Fk: parseInt(id)
            },
            include: {
                Date: true,
                Employee: {
                    select: {
                        Id: true,
                        Person: {
                            select: {
                                Id: true,
                                First_Name: true,
                                Last_Name: true,
                                DNI: true,
                                Phone_Number: true,
                            }
                        },
                        User: {
                            select: {
                                Id: true,
                                Email: true
                            }
                        }
                    }
                },
                Client: {
                    select: {
                        Id: true,
                        Person: {
                            select: {
                                Id: true,
                                First_Name: true,
                                Last_Name: true,
                                DNI: true,
                                Phone_Number: true,
                            }
                        },
                        User: {
                            select: {
                                Id: true,
                                Email: true
                            }
                        }
                    }
                }
            }
        });
        res.json(appointments);
    } catch (error) {
        return http500(error, req, res);

    }
}