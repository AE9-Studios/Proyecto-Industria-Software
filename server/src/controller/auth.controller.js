import prisma from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import 'dotenv/config'

import { http500 } from "../libs/handleErrors.js";
import { createAccessToken } from "../libs/jwt.js";

export const registerClient = async (req, res) => {
    try {
        const {
            email,
            password,
            dni,
            firstName,
            lastName,
            birthDate,
            phone,
            address,
            gender } = req.body;

        const user = await prisma.USER.findUnique({
            where: {
                Email: email
            }
        });

        const person = await prisma.PERSON.findUnique({
            where: {
                DNI: dni
            }
        });

        if (person) return res.status(400).json(['Este DNI ya esta registrado']);

        if (user) {
            return res.status(400).json(['Este correo ya esta registrado']);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        
        const newPerson = await prisma.PERSON.create({
            data: {
                DNI: dni,
                First_Name: firstName,
                Last_Name: lastName,
                Birth_Date: birthDate,
                Phone_Number: phone,
                Address: address,
                Gender: gender,
            }
        });

        const userName = `${firstName.toUpperCase()} ${lastName.toUpperCase()}`

        const newUser = await prisma.USER.create({
            data: {
                Email: email,
                Password: passwordHash,
                User_Name: userName,
                Role: 'CLIENTE'
            }
        });

        const newClient = await prisma.CLIENT.create({
            data: {
                Person: {
                    connect: {
                        Id: newPerson.Id
                    }
                },
                User: {
                    connect: {
                        Id: newUser.Id
                    }
                }
            }
        });

        //crear token si es correcto
        const token = await createAccessToken({
            id: newUser.Id,
            name: newUser.User_Name,
            role: newUser.Role
        });

        res.cookie('token', token)
        res.json({
            id: newUser.Id,
            email: newUser.Email,
            userName: newUser.User_Name,
            role: newUser.Role,
            token: token
        });

    } catch (error) {
        return http500(error, req, res);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.USER.findUnique({
            where: {
                Email: email
            }
        });

        if (!user) {
            return res.status(404).json(['Usuario no encontrado']);
        }

        const isPasswordValid = await bcrypt.compare(password, user.Password);

        if (!isPasswordValid) {
            return res.status(401).json(['Contraseña incorrecta']);
        }

        //crear token si es correcto
        const token = await createAccessToken({
            id: user.Id,
            role: user.Role,
            name: user.User_Name
        });

        res.cookie('token', token)
        res.json({
            id: user.Id,
            userName: user.User_Name,
            role: user.Role,
            token: token
        });
    } catch (error) {
        console.log(error);
        return http500(error, req, res);
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await prisma.USER.findUnique({
            where: {
                Id: req.user.id
            }
        });

        if (!user) {
            return res.status(404).json(['Usuario no encontrado']);
        }

        res.json({
            id: user.Id,
            email: user.Email,
            userName: user.User_Name,
            role: user.Role
        });
    } catch (error) {
        return http500(error, req, res);
    }
}

export const verifyToken = async (req, res) => {
    try {
        const {token} = req.body;
        if (!token) {
            return res.status(401).json(['No autorizado']);
        }

        jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
            if (err) {
                return res.status(401).json(['No autorizado']);
            }

            const userFound = await prisma.USER.findFirst({
                where: {
                    Id: user.id
                }
            });

            if (!userFound) {
                return res.status(401).json(['No autorizado']);
            }

            return res.json({
                id: userFound.Id,
                email: userFound.Email,
                userName: userFound.User_Name,
                role: userFound.Role,
                token: token
            });
        });

    } catch (error) {
        return http500(error, req, res);
    }
}
