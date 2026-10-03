import ProfileIcon from './icons/ProfileIcon';
import Dot from './icons/Dot';
import LikeIcon from './icons/LikeIcon';
import CommentIcon from './icons/CommentIcon';
import { useNavigate } from 'react-router-dom';

export interface BlogData {
   id: string;
   title: string;
   content: string;
   slug: string;
   author: {
      name: string;
   };
   published_at: string;
   likes: number;
   comments: number;
}

const Blog = ({ blog }: { blog: BlogData }) => {
   const navigate = useNavigate();
   const { title, content, author, published_at, likes, comments } = blog;
   const date = new Date(published_at);
   const day = date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
   });

   return (
      <div
         className="flex sm:flex-row justify-between gap-x-6 gap-y-4 lg:w-136 border-b border-zinc-100 py-6 md:py-8 cursor-pointer group"
         onClick={() => {
            navigate(`/${blog.slug}`);
         }}
      >
         <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-1.5 text-xs md:text-[13px] mb-2.5 md:mb-3 ">
               <ProfileIcon size={6} />
               <div className="font-medium text-zinc-900 hover:underline">
                  {author.name}
               </div>
               <Dot />
               <span className="text-zinc-500 text-xs">{day}</span>
            </div>
            <div className="text-lg md:text-[22px] md:text-xl font-extrabold mb-1 md:mb-2 line-clamp-4 md:line-clamp-3 leading-tight text-black group-hover:text-black">
               {title}
            </div>
            <div className="text-[#6B6B6B] md:text-[16px] md:text-sm mb-5 md:mb-6 leading-relaxed md:leading-6 line-clamp-1 md:line-clamp-1">
               {content}
            </div>
            <div className="flex justify-between items-center text-[#6B6B6B] text-xs md:text-[13px] mt-auto">
               <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 hover:text-black transition-colors">
                     <LikeIcon type="solid" />
                     <span>{likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-black transition-colors">
                     <CommentIcon type="solid" />
                     <span>{comments}</span>
                  </div>
               </div>
            </div>
         </div>
         <div className="flex items-center shrink-0 mb-4 sm:mb-0">
            <img
               src="https://images.pexels.com/photos/35678159/pexels-photo-35678159.jpeg"
               alt={title}
               className="w-24 rounded-md sm:w-30 md:w-36 h-16 sm:h-30 md:h-22 object-cover bg-zinc-100 sm:rounded-sm"
            />
         </div>
      </div>
   );
};

export default Blog;
