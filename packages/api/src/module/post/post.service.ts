import { AppError } from '../../errors/app-errors';
import { postRepository } from './post.respository';
import { slugify } from './post.utils';
import { followRepository } from '../follow/follow.repository';

export const postService = {
   getBlogs() {
      return postRepository.getBlogs();
   },

   async getBlog(slug: string, userId?: string) {
      const post = await postRepository.getBlog(slug);

      if (!post) return post;

      let hasLiked = false;
      let isFollowing = false;
      if (userId) {
         const likeRecord = await postRepository.hasLiked(userId, post.id);
         hasLiked = !!likeRecord;

         const followRecord = await followRepository.isFollowing(
            userId,
            post.author!.id,
         );
         isFollowing = !!followRecord;
      }

      return { ...post, hasLiked, isFollowing };
   },

   createBlog(userId: string, title: string, content: string) {
      const slug = slugify(title);

      return postRepository.createBlog(userId, title, content, slug);
   },

   async like(userId: string, slug: string, status: boolean) {
      const post = await postRepository.getPostId(slug);

      if (!post) {
         return new AppError(400, 'Post not found');
      }

      const hasLiked = await postRepository.hasLiked(userId, post.id);

      if (hasLiked && status) {
         throw new AppError(409, 'You have already liked the post');
      }

      if (!hasLiked && !status) {
         throw new AppError(409, 'Cannot unlike post that you have not liked');
      }

      if (!status) {
         return postRepository.unLike(userId, post.id);
      }

      return postRepository.like(userId, post.id);
   },
};
