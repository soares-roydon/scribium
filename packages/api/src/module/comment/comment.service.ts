import { commentRepository } from './comment.repository.js';

export const commentService = {
   getComments(slug: string) {
      return commentRepository.getComments(slug);
   },

   createComment(userId: string, comment: string, slug: string) {
      return commentRepository.createComment(userId, comment, slug);
   },
};
