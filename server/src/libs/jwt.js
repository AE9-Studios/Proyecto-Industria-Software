import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload, process.env.TOKEN_SECRET
        ,{ expiresIn: '1d'
        },(err, token) => {
                if (err) reject
                resolve(token)
            })
    });
}