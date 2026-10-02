import { Button } from '@/components/ui/button';
import CommentIcon from '@/features/main/icons/CommentIcon';
import Dot from '@/features/main/icons/Dot';
import LikeIcon from '@/features/main/icons/LikeIcon';
import ProfileIcon from '@/features/main/icons/ProfileIcon';
import Comments from '@/features/main/Comments';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';

const BlogPage = () => {
   const { slug } = useParams();
   const queryClient = useQueryClient();
   const { data } = useQuery({
      queryKey: [slug],
      queryFn: getBlog,
   });

   const date = new Date(data?.blog?.published_at || new Date());
   const localDate = date.toLocaleDateString('en-US', { dateStyle: 'medium' });

   async function getBlog() {
      const res = await fetch(
         `${process.env.BUN_PUBLIC_BACKEND_URL}/api/v1/blogs/${slug}`,
         {
            credentials: 'include',
         },
      );
      const data = await res.json();

      if (!res.ok) {
         throw new Error(data.error ?? 'Failed to fetch the blog');
      }

      return data;
   }

   const likeBlog = async () => {
      const res: any = await fetch(
         `${process.env.BUN_PUBLIC_BACKEND_URL}/api/v1/blogs/${slug}/like`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ status: !data?.blog?.hasLiked }),
         },
      );
      const responseData = await res.json();
      if (!res.ok) throw new Error(responseData.error ?? 'Failed to like');
      return responseData;
   };

   const { mutate } = useMutation({
      mutationFn: likeBlog,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [slug] });
      },
   });

   const followUserFn = async () => {
      const res = await fetch(
         `${process.env.BUN_PUBLIC_BACKEND_URL}/api/v1/user/follow`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
               followingId: data?.blog?.author?.id,
               status: !data?.blog?.isFollowing,
            }),
         },
      );
      const resData = await res.json();
      if (!res.ok) throw new Error(resData.error ?? 'Failed to follow');
      return resData;
   };

   const { mutate: followUser } = useMutation({
      mutationFn: followUserFn,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: [slug] });
      },
   });

   return (
      <>
         <MainLayout>
            <div className="flex justify-center p-4">
               <div className="flex flex-col w-full max-w-170 mt-6 md:mt-10 overflow-hidden">
                  <div className="text-3xl md:text-[42px] font-extrabold mb-6 leading-tight tracking-tight text-zinc-900 wrap-break-word">
                     {data?.blog?.title}
                  </div>
                  <div className="flex gap-2 md:gap-4 items-start md:items-center mb-8">
                     <div className="mt-1 md:mt-0 shrink-0">
                        <ProfileIcon size={10} />
                     </div>
                     <div className="flex flex-col min-w-0">
                        <div className="flex flex-wrap items-center gap-2 md:gap-4">
                           <div className="font-medium text-zinc-900 hover:underline cursor-pointer truncate">
                              {data?.blog?.author?.name}
                           </div>
                           <Button
                              variant={'outline'}
                              className="rounded-full border-zinc-800 font-normal group w-24 h-8 px-2 md:px-4 text-xs md:text-sm"
                              onClick={() => followUser()}
                           >
                              {data?.blog?.isFollowing ? (
                                 <>
                                    <span className="group-hover:hidden">
                                       Following
                                    </span>
                                    <span className="hidden group-hover:block text-red-600">
                                       Unfollow
                                    </span>
                                 </>
                              ) : (
                                 'Follow'
                              )}
                           </Button>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 text-xs md:text-sm text-zinc-500 mt-2 md:mt-1">
                           <div>
                              {Math.round(
                                 (data?.blog?.content?.length || 0) / 100,
                              ) || 1}{' '}
                              min read
                           </div>
                           <Dot />
                           <div>{localDate}</div>
                        </div>
                     </div>
                  </div>
                  <div className="flex gap-6 py-3 border-y border-zinc-100 text-zinc-500 mb-8 md:mb-10">
                     <div
                        className="flex gap-2 items-center cursor-pointer hover:text-zinc-900"
                        onClick={() => mutate()}
                     >
                        <LikeIcon
                           type={data?.blog?.hasLiked ? 'solid' : 'outline'}
                           size={6}
                        />
                        <div className="text-sm">{data?.blog?.likes || 0}</div>
                     </div>
                     <div className="flex gap-2 items-center cursor-pointer hover:text-zinc-900">
                        <CommentIcon type="outline" size={6} />
                        <div className="text-sm">
                           {data?.blog?.comments || 0}
                        </div>
                     </div>
                  </div>
                  <div className="text-lg md:text-[20px] text-zinc-800 font-serif mb-12 whitespace-pre-wrap leading-relaxed wrap-break-word">
                     {data?.blog?.content}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-8 border-t border-zinc-100 items-start">
                     <div className="hidden sm:block shrink-0">
                        <ProfileIcon size={12} />
                     </div>
                     <div className="block sm:hidden shrink-0">
                        <ProfileIcon size={10} />
                     </div>
                     <div className="flex flex-col sm:flex-row justify-between w-full items-start gap-4">
                        <div className="flex flex-col gap-2 min-w-0">
                           <div className="font-bold text-xl md:text-2xl wrap-break-word">
                              Written by {data?.blog?.author?.name}
                           </div>
                           <div className="text-zinc-500 text-sm md:text-base wrap-break-word">
                              {data?.blog?.author?.bio || 'Scribium Writer'}
                           </div>
                        </div>
                        <Button
                           variant={
                              data?.blog?.isFollowing ? 'outline' : 'default'
                           }
                           className={`rounded-full px-4 py-2 h-auto text-sm group w-24 shrink-0 ${
                              data?.blog?.isFollowing
                                 ? 'border-zinc-800 font-normal'
                                 : 'bg-green-600 hover:bg-green-700 text-white'
                           }`}
                           onClick={() => followUser()}
                        >
                           {data?.blog?.isFollowing ? (
                              <>
                                 <span className="group-hover:hidden">
                                    Following
                                 </span>
                                 <span className="hidden group-hover:block text-red-600">
                                    Unfollow
                                 </span>
                              </>
                           ) : (
                              'Follow'
                           )}
                        </Button>
                     </div>
                  </div>
                  {slug && <Comments slug={slug} />}
               </div>
            </div>
         </MainLayout>
      </>
   );
};

export default BlogPage;
