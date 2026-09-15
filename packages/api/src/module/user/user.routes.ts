import { Router } from 'express';
import { userController } from './user.controller';

const router = Router();

router.post('/user/signup', userController.signup);
router.post('/user/signin', userController.signin);

export default router;
