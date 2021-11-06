import jwt from 'jsonwebtoken';
import { config } from '../config.js'
import * as userRepository from '../data/user.js'

const AUTH_ERROR = { message: 'Authentication Error' }

export const isAuth = async (req, res, next) => {

    const authHeader = req.get('Authorization');
    if (!(authHeader && authHeader.startsWith('Bearer '))) {
        return res.status(401).json(AUTH_ERROR);
    }

    const token = authHeader.split(' ')[1]
    jwt.verify(
        token,
        config.jwt.secretKey,
        async (error, decode) => {
            if (error) {
                console.log(error);
                return res.status(401).json(AUTH_ERROR)
            }

            const user = await userRepository.findById(decode.id);

            if (!user) {
                res.status(401).json(AUTH_ERROR)
            }

            req.userId = user.id;

            next();
        })
}