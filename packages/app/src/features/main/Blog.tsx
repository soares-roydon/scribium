import React from 'react';
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
         className="flex flex-col-reverse sm:flex-row justify-between gap-x-8 gap-y-6 max-w-170 border-b border-zinc-100 py-8 cursor-pointer group"
         onClick={() => {
            navigate(`/${blog.slug}`);
         }}
      >
         <div className="flex-1 min-w-0 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-[13px] mb-3">
               <ProfileIcon size={6} />
               <div className="font-medium text-zinc-900 hover:underline">
                  {author.name}
               </div>
            </div>
            <div className="text-[22px] font-extrabold mb-2 line-clamp-2 leading-tight text-zinc-900 group-hover:text-black">
               {title}
            </div>
            <div className="text-[#6B6B6B] text-[16px] mb-6 leading-6 line-clamp-2">
               {content}
            </div>
            <div className="flex justify-between items-center text-[#6B6B6B] text-[13px] mt-auto">
               <div className="flex items-center gap-4">
                  <span>{day}</span>
                  <div className="flex items-center gap-1.5 hover:text-black transition-colors">
                     <LikeIcon type="solid" />
                     <span>{likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5 hover:text-black transition-colors">
                     <CommentIcon type="solid" />
                     <span>{comments}</span>
                  </div>
               </div>
               <div className="flex items-center gap-4">
                  <span>
                     {Math.round((content.length || 0) / 100) || 1} min read
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Blog;
