import jwt from 'jsonwebtoken'
import 'dotenv/config'
import prisma from "../db.js";

export const adminAuth = async (req, res, next) => {
    const { token } = req.cookies

    if (!token) return res.status(401).send('Autorizacion denegada')

    jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(403).send('Autorizacion denegada');
        const userFound = await prisma.USER.findFirst({
            where: {
                Id: user.id
            }
        });

        if (!userFound) {
            return res.status(403).send('Autorizacion denegada');
        }
        if(userFound.Role !==  "ADMINISTRADOR"){
            return res.status(403).send('Autorizacion denegada');
        }
        next()
    })

}