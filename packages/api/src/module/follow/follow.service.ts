import { AppError } from '../../errors/app-errors';
import { followRepository } from './follow.repository';

export const followService = {
   getFollowers(userId: string) {
      return followRepository.getFollowers(userId);
   },

   getFollowing(userId: string) {
      return followRepository.getFollowing(userId);
   },

   async follow(followerId: string, followingId: string, status: boolean) {
      const isFollowing = await followRepository.isFollowing(
         followerId,
         followingId,
      );

      if (isFollowing && status) {
         throw new AppError(409, 'You are already following the user');
      }

      if (!isFollowing && !status) {
         throw new AppError(409, 'Cannot unfollow user that you do not follow');
      }

      if (!status) {
         return followRepository.unfollow(followerId, followingId);
      }

      return followRepository.follow(followerId, followingId);
   },
};
