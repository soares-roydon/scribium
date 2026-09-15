import type { Request, Response } from 'express';
import { queryParamSchema } from '../post/post.types';
import { commentService } from './comment.service';
import { commentSchema } from './comment.types';

export const commentController = {
   async getComments(req: Request, res: Response) {
      const parsedQueryParam = queryParamSchema.safeParse(req.params);

      if (
         !parsedQueryParam.success ||
         parsedQueryParam.data?.slug === undefined
      ) {
         return res.status(400).json({ error: 'Invalid query parameter' });
      }

      const comments = await commentService.getComments(
         parsedQueryParam.data.slug,
      );

      return res.status(200).json({ comments });
   },

   async createComment(req: Request, res: Response) {
      const parsedComment = commentSchema.safeParse(req.body);
      const parsedQueryParam = queryParamSchema.safeParse(req.params);

      if (
         !parsedQueryParam.success ||
         parsedQueryParam.data?.slug === undefined
      ) {
         return res.status(400).json({ error: 'Invalid query parameter' });
      }

      if (!parsedComment.success) {
         return res
            .status(400)
            .json({ error: parsedComment.error.issues[0]?.message });
      }

      await commentService.createComment(
         req.userId!,
         parsedComment.data.comment,
         parsedQueryParam.data.slug,
      );

      return res.status(200).json({ message: 'Comment created' });
   },
};
