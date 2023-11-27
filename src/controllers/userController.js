import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import bcrypts from 'bcrypt';
import bcrypt from 'bcryptjs';
import Models from '../database/models';
import { encode } from '../utils/jwt';


dotenv.config();
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
          .json({ status: 400, message: ('Check well the passwords you are inserting') });
      }
      if (inSystem) {
        return res
          .status(409)
          .json({ status: 409, message: ('The email is already in the system') });
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
        message: ('user created successfully'),
        user: newUserDisplay
      });
    } catch (error) {
      return res.status(500).json({ status: 500, 
        message: error.details[0].message.replace(/"/g, ''),
      });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const isUser = await Users.findOne({
        where: { email },
      });
      if (!isUser) {
        return res.status(404).json({
          status: 404,
          message: 'Wrong email, please enter the registered email.',
        });
      }

      if (!bcrypt.compareSync(password, isUser.password)) {
        return res.status(400).json({
          status: 400,
          message: ('One of you credentials must be wrong, please verify your credentials.'),
        });
      }
      const payload = { email };
      const accessToken = encode(payload);

      // Update user
      await Users.update({ isLoggedIn: true },
        {where: { email } });

      const LoggedInUser = await Users.findOne({
        where: { email }
      });

      return res.status(200).json({
        status: 200,
        name: isUser.firstName,
        message: ('logged In successfully'),
        token: accessToken,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.details[0].message.replace(/"/g, ''),
      });
    }    
  }


  static async viewUser(req, res) {
    try {
      const { email } = req.params;
      const result = await Users.findOne({
        where: { email },
      });
      if (!result) {
        return res.status(400).json({
          status: 400,
          message: ('No result on that email'),
        });
      }
      return res.status(200).json({
        status: 200,
        message: 'Result fetched successfully',
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        message: error.message,
      });
    }
  }


  // static async editUser(req, res) {
  //   try {
  //     const { email } = req.params;
  //     const result = await Users.findOne(req.body, {
  //       where: { email },
  //     });
  //     if (!result) {
  //       return res.status(400).json({
  //         status: 400,
  //         message: ('No result on that emai'),
  //       });
  //     }
  //     const display = await Users.update(req.body, {
  //       where: { email },
  //     });
  //     console.log("result..................", result)
  //     return res.status(200).json({
  //       status: 200,
  //       message: 'Result updated successfully',
  //       data: display,
  //     });
  //   } catch (err) {
  //     return res.status(500).send(err.message);
  //   }
  // }



  static async updateProfile(req, res) {
    try {
      const { user } = req.user;
      const updatedField = await Users.update(req.body, {
        where: { user },
        returning: true,
        plain: true,
      });
      const userData = updatedField[1];

      // for cloudinary image upload 
      const result = await uploadImage(req.file
        // , {folder:'acubed-profil-pictures'}
        );

        // await Users.update(
        //   {profilPicture: result.secure_url},
        //   {where: { user }},
        // );

      return res.status(200).json({
        status: 200,
        message: 'user updated',
        data: {
          firstname: userData.firstName,
          lastname: userData.lastName,
          email: userData.email,
          address: userData.address,

          // have to up on profilPicture result.secure_url
          // profilPicture: result.secure_url



        },
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }

}

  export default register;