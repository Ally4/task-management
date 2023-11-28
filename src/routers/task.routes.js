import express from 'express';
import multer from 'multer';
import taskController from '../controllers/taskController';
import checkUser from '../middleware/checkUser';
import { validateTask } from '../validations/taskValidation';

const storage = multer.memoryStorage();
const upload = multer({ storage });


const router = express.Router();

router.post('/create', 
validateTask,
upload.single('pdfFile'),
upload.single('image'),
 taskController.create);

 router.get('/tasks', 
 taskController.getAllTasks);

 router.patch('/task', 
 checkUser,
 validateTask,
 taskController.updateTask);

 router.get('/task/:title', 
 taskController.getTaskByTitle);

 router.delete('/task/:title', 
 taskController.deleteTask);

 router.patch('/task/:title', 
 taskController.draftTask);

 export default router;
