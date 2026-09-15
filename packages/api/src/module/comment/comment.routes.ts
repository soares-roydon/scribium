import { Router } from 'express';
import { commentController } from './comment.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router({ mergeParams: true });

router.route('/').get(commentController.getComments);
router.route('/').post(authMiddleware, commentController.createComment);

export default router;
