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
};
