import { Button } from '@/components/ui/button';
import CommentIcon from '@/features/main/icons/CommentIcon';
import Dot from '@/features/main/icons/Dot';
import LikeIcon from '@/features/main/icons/LikeIcon';
import ProfileIcon from '@/features/main/icons/ProfileIcon';
import NavBar from '@/features/main/NavBar';
import Comments from '@/features/main/Comments';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

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
         <div className="sticky top-0 z-50">
            <NavBar />
         </div>
         <div className="flex justify-center p-4">
            <div className="flex flex-col min-w-xl w-full max-w-170 mt-10">
               <div className="text-[42px] font-extrabold mb-6 leading-tight tracking-tight text-zinc-900">
                  {data?.blog?.title}
               </div>

               <div className="flex gap-2 items-center mb-8">
                  <ProfileIcon size={10} />
                  <div className="flex flex-col">
                     <div className="flex items-center gap-4">
                        <div className="font-medium text-zinc-900 hover:underline cursor-pointer">
                           {data?.blog?.author?.name}
                        </div>
                        <Button
                           variant={'outline'}
                           className="rounded-full border-zinc-800 font-normal group w-24"
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
                        <div className="flex items-center gap-2 text-sm text-zinc-500">
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
               </div>

               <div className="flex gap-6 py-3 border-y border-zinc-100 text-zinc-500 mb-10">
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
                     <div className="text-sm">{data?.blog?.comments || 0}</div>
                  </div>
               </div>

               <div className="text-[20px] text-zinc-800 font-serif mb-12 whitespace-pre-wrap leading-relaxed">
                  {data?.blog?.content}
               </div>
               <div className="flex gap-4 py-8 border-t border-zinc-100">
                  <ProfileIcon size={12} />
                  <div className="flex justify-between w-full items-start">
                     <div className="flex flex-col gap-2">
                        <div className="font-bold text-2xl">
                           Written by {data?.blog?.author?.name}
                        </div>
                        <div className="text-zinc-500 text-base">
                           {data?.blog?.author?.bio || 'Scribium Writer'}
                        </div>
                     </div>
                     <Button
                        variant={
                           data?.blog?.isFollowing ? 'outline' : 'default'
                        }
                        className={`rounded-full px-4 py-2 h-auto text-sm group w-24 ${
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
      </>
   );
};

export default BlogPage;
