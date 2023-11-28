import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET_KEY || 'yousaidthatIwontmakewiththehelpofAllahwatchmeout';

export const decode = (token) => jwt.verify(token, secret);

export const encode = (payload) => jwt.sign({ payload }, secret);

export const encodeExpire = (payload) => jwt.sign({ payload }, secret);