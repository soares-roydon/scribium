import { db } from '../../prisma/db';

export const followRepository = {
   getFollowers(userId: string) {
      return db.orm.public.Follow.where({ followingId: userId })
         .select('followerId')
         .include('follower', (follower) => follower.select('name'))
         .all();
   },

   getFollowing(userId: string) {
      return db.orm.public.Follow.where({ followerId: userId })
         .select('followingId')
         .include('following', (following) => following.select('name'))
         .all();
   },

   follow(followerId: string, followingId: string) {
      return db.orm.public.Follow.create({
         followerId,
         followingId,
      });
   },

   unfollow(followerId: string, followingId: string) {
      return db.orm.public.Follow.where({
         followerId,
         followingId,
      }).delete();
   },

   isFollowing(followerId: string, followingId: string) {
      return db.orm.public.Follow.where({
         followerId,
         followingId,
      })
         .select('followerId')
         .first();
   },
};
