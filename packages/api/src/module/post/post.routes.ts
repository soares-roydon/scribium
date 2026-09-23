import { Router } from 'express';
import { postController } from './post.controller';
import commentRouter from '../comment/comment.routes';
import {
   authMiddleware,
   optionalAuthMiddleware,
} from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', optionalAuthMiddleware, postController.getBlogs);
router.get('/:slug', optionalAuthMiddleware, postController.getBlog);
router.post('/', authMiddleware, postController.createPost);
router.post('/:slug/like', authMiddleware, postController.like);
router.use('/:slug/comments', commentRouter);

export default router;
