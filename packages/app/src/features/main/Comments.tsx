import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ProfileIcon from './icons/ProfileIcon';

export const Comments = ({ slug }: { slug: string }) => {
   const [comment, setComment] = useState('');
   const queryClient = useQueryClient();

   const { data } = useQuery({
      queryKey: ['comments', slug],
      queryFn: async () => {
         const res = await fetch(
            `${process.env.BUN_PUBLIC_BACKEND_URL}/api/v1/blogs/${slug}/comments`,
         );
         const data = await res.json();
         if (!res.ok) throw new Error(data.error ?? 'Failed to fetch comments');
         return data.comments;
      },
   });

   const { mutate, isPending } = useMutation({
      mutationFn: async () => {
         const res = await fetch(
            `${process.env.BUN_PUBLIC_BACKEND_URL}/api/v1/blogs/${slug}/comments`,
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               credentials: 'include',
               body: JSON.stringify({ comment }),
            },
         );
         const data = await res.json();
         if (!res.ok) throw new Error(data.error ?? 'Failed to post comment');
         return data;
      },
      onSuccess: () => {
         setComment('');
         queryClient.invalidateQueries({ queryKey: ['comments', slug] });
         queryClient.invalidateQueries({ queryKey: [slug] });
      },
   });

   return (
      <div className="mt-8 border-t pt-8">
         <h3 className="text-2xl font-bold mb-6">Comments</h3>
         <div className="flex gap-4 mb-8">
            <ProfileIcon size={10} />
            <div className="flex-1 flex flex-col items-end gap-2">
               <Input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What are your thoughts?"
                  className="w-full"
               />
               <Button
                  onClick={() => mutate()}
                  disabled={isPending || !comment.trim()}
                  className="rounded-full"
               >
                  Respond
               </Button>
            </div>
         </div>
         <div className="flex flex-col gap-6">
            {data?.map((c: any) => (
               <div key={c.id} className="flex gap-4">
                  <ProfileIcon size={8} />
                  <div>
                     <div className="font-semibold">
                        {c.user?.name || 'User'}
                     </div>
                     <div className="text-gray-600 mt-1">{c.comment}</div>
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
};

export default Comments;
