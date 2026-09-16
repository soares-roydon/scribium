import { Router } from 'express';
import { followController } from './follow.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

// GET /api/v1/user/followers
// GET /api/v1/user/following
// GET /api/v1/user     return => {user info + followers/following count}

const router = Router();

router.get('/followers', authMiddleware, followController.getFollowers);
router.get('/following', authMiddleware, followController.getFollowing);
router.post('/follow', authMiddleware, followController.follow);

export default router;
