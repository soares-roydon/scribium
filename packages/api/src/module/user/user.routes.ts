import { Router } from 'express';
import { userController } from './user.controller';
import followRouter from '../follow/follow.routes';

const router = Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.use('/', followRouter);

export default router;
