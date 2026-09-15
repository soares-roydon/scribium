import { Router } from 'express';
import { postController } from './post.controller';
import commentRouter from '../comment/comment.routes';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', postController.getBlogs);
router.get('/:slug', postController.getBlog);
router.post('/', authMiddleware, postController.createPost);
router.use('/:slug/comments', commentRouter);

export default router;
