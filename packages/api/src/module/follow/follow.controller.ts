import type { Request, Response } from 'express';
import { followService } from './follow.service';
import { followSchema } from './follow.types';

export const followController = {
   async getFollowers(req: Request, res: Response) {
      const userId = req.userId!;
      const followers = await followService.getFollowers(userId);

      return res.status(200).json({ followers });
   },

   async getFollowing(req: Request, res: Response) {
      const userId = req.userId!;
      const following = await followService.getFollowing(userId);

      return res.status(200).json({ following });
   },

   async follow(req: Request, res: Response) {
      const parsedFollowData = followSchema.safeParse(req.body);
      const followerId = req.userId!;

      if (!parsedFollowData.success) {
         return res
            .status(400)
            .json({ error: parsedFollowData.error.issues[0] });
      }

      const { followingId, status } = parsedFollowData.data;
      await followService.follow(followerId, followingId, status);

      return res.status(200).json({ message: `Success` });
   },
};
