import { Router } from 'express';
import { userController } from './user.controller.js';
import followRouter from '../follow/follow.routes.js';
import { authMiddleware } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/signup', userController.signup);
router.post('/signin', userController.signin);
router.get('/', authMiddleware, userController.getUser);
router.use('/', followRouter);

export default router;
