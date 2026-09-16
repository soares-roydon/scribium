import { db } from '../../prisma/db';

/* 
    blog {
        title,
        content,
        author_name,
        date_created,
        likes,
        comments,
        profile_image
    }
*/

export const postRepository = {
   getBlogs() {
      const posts = db.orm.public.Post.select(
         'id',
         'title',
         'content',
         'slug',
         'created_at',
         'published_at',
      )
         .include('author', (author) => author.select('id', 'name'))
         .include('likes', (likes) => likes.count())
         .include('comments', (comments) => comments.count())
         .all();

      return posts;
   },

   getBlog(slug: string) {
      const post = db.orm.public.Post.select(
         'id',
         'title',
         'slug',
         'created_at',
         'published_at',
      )
         .include('author', (author) => author.select('id', 'name'))
         .include('likes', (likes) => likes.count())
         .include('comments', (comments) => comments.count())
         .where({ slug })
         .first();

      return post;
   },

   createBlog(userId: string, title: string, content: string, slug: string) {
      return db.orm.public.Post.create({
         title,
         content,
         slug,
         authorId: userId,
      });
   },

   getPostId(slug: string) {
      return db.orm.public.Post.select('id').where({ slug }).first();
   },

   hasLiked(userId: string, postId: string) {
      return db.orm.public.Like.where({
         userId,
         postId,
      }).first();
   },

   like(userId: string, postId: string) {
      return db.orm.public.Like.create({
         userId,
         postId,
      });
   },

   unLike(userId: string, postId: string) {
      return db.orm.public.Like.where({
         userId,
         postId,
      }).delete();
   },
};
