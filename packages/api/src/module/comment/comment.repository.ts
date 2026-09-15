import { db } from '../../prisma/db';
import { postRepository } from '../post/post.respository';

export const commentRepository = {
   async getComments(slug: string) {
      const postId = await postRepository.getPostId(slug);
      return db.orm.public.Comment.where({ postId: postId?.id }).all();
   },

   async createComment(userId: string, comment: string, slug: string) {
      const post = await postRepository.getPostId(slug);

      return db.orm.public.Comment.where({ userId }).create({
         comment,
         userId,
         postId: post?.id,
      });
   },
};
