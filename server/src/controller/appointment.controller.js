import prisma from "../db.js";
import { http500 } from "../libs/handleErrors.js";


export const createAppointmentSolicitation = async (req, res) => {
    const { date, description, clientId } = req.body;
    try {
        const newAppointment = await prisma.aPPOINTMENT_SOLICITATION.create({
            data: {
                Date: new Date(date),
                Description: description,
                Client_Fk: clientId,
                State: 'PENDIENTE'
            }
        });
        res.status(200).json(newAppointment);
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
    try {
        const newAppointment = await prisma.aPPOINTMENT.create({
            data: {
                Date: new Date(date),
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
    const { clientId } = req.params;
    try {
        const appointments = await prisma.aPPOINTMENT_SOLICITATION.findMany({
            where: {
                Client_Fk: clientId
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
    const { employeeId } = req.params;
    try {
        const appointments = await prisma.aPPOINTMENT_SOLICITATION.findMany({
            where: {
                Employee_Fk: employeeId
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