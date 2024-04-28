import prisma from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import randomstring from 'randomstring';
import 'dotenv/config'

import { sendEmailRecoveryPassword } from "../libs/sendEmail.js";
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

        if (client) return res.status(400).json(['Este DNI ya esta registrado']);

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
                Person_Fk: newPerson.Id,
                User_Fk: newUser.Id
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

        if (user.Role === 'EMPLEADO') {
            const employee = await prisma.EMPLOYEE.findFirst({
                where: {
                    User_Fk: user.Id
                }
            });

            if (!employee) {
                return res.status(404).json(['Empleado no encontrado']);
            }

            if (employee.State !== 'ENABLED') {
                return res.status(401).json(['Cuenta desactivada']);
            }
        }

        if (user.Role === 'EMPLEADO') {
            const employee = await prisma.EMPLOYEE.findFirst({
                where: {
                    User_Fk: user.id
                },
                include: {
                    Person: true,
                }
            });

            //crear token si es correcto
            const token = await createAccessToken({
                id: user.Id,
                role: user.Role,
                name: user.User_Name
            });

            res.cookie('token', token)

            return res.json({
                id: user.Id,
                email: user.Email,
                userName: user.User_Name,
                role: user.Role,
                token: token,
                employeeData: employee
            });


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
        const { token } = req.body;
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

            const employee = await prisma.EMPLOYEE.findFirst({
                where: {
                    User_Fk: user.id,
                    State: 'DISABLED'
                }
            });

            if (employee) {
                return res.status(401).json(['No autorizado']);
            }

            if (userFound.Role === 'EMPLEADO') {
                const employee = await prisma.EMPLOYEE.findFirst({
                    where: {
                        User_Fk: user.id
                    },
                    include: {
                        Person: true,
                    }
                });

                return res.json({
                    id: userFound.Id,
                    email: userFound.Email,
                    userName: userFound.User_Name,
                    role: userFound.Role,
                    token: token,
                    employeeData: employee
                });


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

export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.json('Sesión cerrada');
    } catch (error) {
        return http500(error, req, res);
    }
}

export const recoveryPassword = async (req, res) => {
    try {
      const { email } = req.body;
  
      let user;
      let userFromUserTable;
      let name;
      if (email.endsWith("@classicvision.com")) {
        userFromUserTable = await prisma.USER.findFirst({
          where: {
            Email: email,
          },
          include: {
            Employee: true,
          },
        });
        user = userFromUserTable?.Employee ? userFromUserTable.Employee[0] : null;
        name = userFromUserTable.User_Name;
      } else {
        user = await prisma.USER.findFirst({
          where: {
            Email: email,
          },
        });
      }
  
      if (user) {
        const userEmail = user.Email;
        const code = randomstring.generate({
          length: 7,
          charset: "alphanumeric",
        });
        const expire = 5;
        let token;
        if (email.endsWith("@classicvision.com")) {
          token = jwt.sign({ Email: userFromUserTable.Email }, code, {
            expiresIn: `${expire}m`,
          });
        } else {
          token = jwt.sign({ Email: userEmail }, code, {
            expiresIn: `${expire}m`,
          });
        }
        setTimeout(() => {
          delete process.env[token.slice(0, 8)];
        }, expire * 60 * 1000);
        process.env[token.slice(0, 8)] = code;
  
        const maskedEmail = email.endsWith("@classicvision.com")
          ? `${"****" + user.Email.slice(4)}`
          : email;
        const url = `http://localhost:3000/api/auth/password-reset?token=${token}`;
  
        if (email.endsWith("@classicvision.com")) {
          sendEmailRecoveryPassword(user, name, url, expire);
        } else {
          sendEmailRecoveryPassword(user, user.User_Name, url, expire);
        }
        if (email.endsWith("@classicvision.com")) {
          res
            .status(200)
            .json([
              `Se envió correo de confirmación a su correo personal ${maskedEmail}`,
            ]);
        } else {
          res
            .status(200)
            .json(["Se envió correo de confirmación a su correo personal"]);
        }
      } else {
        res.status(500).json(["El correo electrónico no está registrado"]);
      }
    } catch (e) {
      console.log(e);
      res.status(500).json(["Error al consultar los datos"]);
    }
};
  
export const resetPasswordPage = async (req, res) => {
    try {
      const { token } = req.query;
  
      const code = process.env[token.slice(0, 8)];
      if (code != undefined) {
        const url = encodeURIComponent(token.replace(/\./g, "%"));
  
        res.redirect(`http://localhost:5173/reset-password/${url}`);
      } else {
        console.error("El enlace ha expirado");
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(["Error al redirigir a la página de restablecimiento" + error]);
    }
};
  
export const resetPassword = async (req, res) => {
    try {
      const { password, token } = req.body;
  
      const code = process.env[token.slice(0, 8)];
  
      const verificarToken = async () => {
        return new Promise((resolve, reject) => {
          jwt.verify(token, code, (err, decoded) => {
            if (code == undefined) {
              reject("El enlace ha expirado o no existe");
              return;
            }
            if (err) {
              console.log(err);
              reject("Ocurrió un error en el formato del token");
            } else {
              resolve(decoded);
            }
          });
        });
      };
  
      try {
        const decoded = await verificarToken();
        const passwordHash = await bcrypt.hash(password, 10);
  
        console.log(decoded);
  
        const updatedUser = await prisma.USER.update({
          where: {
            Email: decoded.Email,
          },
          data: {
            Password: passwordHash,
          },
        });
  
        res.status(200).json(["Contraseña actualizada con éxito"]);
        delete process.env[token.slice(0, 8)];
      } catch (error) {
        console.error(error);
        res
          .status(500)
          .json(["Ocurrió un error al actualizar la contraseña", error]);
      }
      return;
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json([
          "Error al procesar la solicitud de restablecimiento de contraseña",
        ]);
    }
};