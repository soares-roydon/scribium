import Blog, { type BlogData } from './Blog';

const Blogs = ({ blogs }: { blogs: BlogData[] }) => {
   return (
      <div>
         {blogs.map((blog) => (
            <Blog blog={blog} key={blog.slug} />
         ))}
      </div>
   );
};

export default Blogs;
