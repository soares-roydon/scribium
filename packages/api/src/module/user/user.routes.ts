import { Router } from 'express';
import { userController } from './user.controller';
import followRouter from '../follow/follow.routes';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/', authMiddleware, userController.getUser);
router.use('/', followRouter);

export default router;
