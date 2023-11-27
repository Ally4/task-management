import express from 'express';
import userController from '../controllers/userController';
import checkUser from '../middleware/checkUser';
import { validationSignup } from '../validations/signupValidation';
import { validationLogin } from '../validations/loginValidation';
import { validationEdit } from '../validations/editValidation';


const router = express.Router();

router.post('/register', 
validationSignup,
 userController.signup);

 router.post('/login', 
validationLogin,
 userController.login);

 router.patch('/edit', 
 checkUser,
 validationEdit,
 userController.updateProfile);

 router.get('/user/:email', 
 userController.viewUser);

 export default router;
