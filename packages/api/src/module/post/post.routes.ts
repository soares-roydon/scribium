import { Router } from 'express';
import { postController } from './post.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', postController.getBlogs);
router.get('/:slug', postController.getBlog);
router.post('/', authMiddleware, postController.createPost);

export default router;
