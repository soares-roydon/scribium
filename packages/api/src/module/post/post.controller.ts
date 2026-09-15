import type { Request, Response } from 'express';
import { postService } from './post.service';
import { blogSchema, queryParamSchema } from './post.types';

export const postController = {
   async getBlogs(req: Request, res: Response) {
      const blogs = await postService.getBlogs();

      return res.status(200).json(blogs);
   },

   async getBlog(req: Request, res: Response) {
      const parsedQueryParam = queryParamSchema.safeParse(req.params);

      if (!parsedQueryParam || parsedQueryParam.data?.slug === undefined) {
         return res.status(400).json({ error: 'Invalid query parameter' });
      }

      const blog = await postService.getBlog(parsedQueryParam.data?.slug);

      return res.status(200).json({ blog });
   },

   async createPost(req: Request, res: Response) {
      const parsedBlog = blogSchema.safeParse(req.body);

      if (!parsedBlog.success) {
         return res
            .status(400)
            .json({ error: parsedBlog.error.issues[0]?.message });
      }

      const userId = req.userId!;
      const { title, content } = parsedBlog.data;

      await postService.createBlog(userId, title, content);

      return res.status(201).json({ message: 'Blog created successfully' });
   },
};
