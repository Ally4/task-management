import dotenv from 'dotenv';
import { decode } from '../utils/jwt';
import Models from '../database/models';

const { Users } = Models;
dotenv.config();

const authentication = async (req, res, next) => {
  try {
    const token = req.header('token');

    if (!token) return res.status(401).json({ status: 401, message: ('Please login') });

    const user = decode(token);

    const activeUser = await Users.findOne({ where: { user: user.payload.email } });

    // const activeUser = await Users.findOne({ where: { email: user.payload.email } });

    if (activeUser?.isLoggedIn === false) {
      return res.status(404).json({ status: 404, message: ('you are not logged in') });
    }
    req.user = activeUser;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ status: 401, message: ('Invalid token') });
  }
};

export default authentication;
