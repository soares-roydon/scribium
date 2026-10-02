import { Router } from 'express';
import { postController } from './post.controller.js';
import commentRouter from '../comment/comment.routes.js';
import {
   authMiddleware,
   optionalAuthMiddleware,
} from '../../middlewares/auth.middleware.js';

const router = Router();

router.get('/', optionalAuthMiddleware, postController.getBlogs);
router.get('/:slug', optionalAuthMiddleware, postController.getBlog);
router.post('/', authMiddleware, postController.createPost);
router.post('/:slug/like', authMiddleware, postController.like);
router.use('/:slug/comments', commentRouter);

export default router;
