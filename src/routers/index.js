import { Router } from 'express';
import userRoute from './auth.routes';

const router = Router();

router.use('/api/v1/auth', userRoute);


export default router;