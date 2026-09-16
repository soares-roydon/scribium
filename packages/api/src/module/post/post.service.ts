import { AppError } from '../../errors/app-errors';
import { postRepository } from './post.respository';
import { slugify } from './post.utils';

export const postService = {
   getBlogs() {
      return postRepository.getBlogs();
   },

   getBlog(slug: string) {
      return postRepository.getBlog(slug);
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
