import { Router } from 'express';
import userRoute from './auth.routes';
import taskRoute from './task.routes';

const router = Router();

router.use('/api/v1/auth', userRoute);

router.use('/api/v1/task', taskRoute);


export default router;