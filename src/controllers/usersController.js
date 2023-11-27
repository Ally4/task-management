import dotenv from 'dotenv';
import mail from '@sendgrid/mail';
import { v4 as uuidv4 } from 'uuid';
import bcrypts from 'bcrypt';
import Models from '../database/models';
import { encode } from '../utils/jwt';


dotenv.config();
mail.setApiKey(process.env.SENDGRID);
const { Users } = Models;


class register {
  static async signup(req, res) {
    try {
      const {
        email,
        firstName,
        lastName, 
        password,
        confirmPassword,
        phoneNumber,
        address
      } = req.body;
      const id = uuidv4();
      const inSystem = await Users.findOne({
        where: { email },
      });
      if (password !== confirmPassword) {
        return res
          .status(400)
          .json({ status: 400, message: res.__('Check well the passwords you are inserting') });
      }
      if (inSystem) {
        return res
          .status(409)
          .json({ status: 409, message: res.__('The email or phone number is already in the system') });
      }

      const payload = { email, firstName, lastName };
      const accessToken = encode(payload);
      
      const thePassword = bcrypts.hashSync(password, 10);


      const newUser = await Users.create({
        id,
        email,
        firstName,
        lastName,
        password: thePassword,
        phoneNumber,
        address
      });
      const newUserDisplay = {
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        token: accessToken,
      };
      
      await Users.update({ isLoggedIn: true },
        {where: { email } });

      return res.status(201).json({
        status: 201,
        message: res.__('user created successfully'),
        user: newUserDisplay
      });
    } catch (error) {
      return res.status(500).json({ status: 500, message: error.message });
    }
  }
}

  export default register;