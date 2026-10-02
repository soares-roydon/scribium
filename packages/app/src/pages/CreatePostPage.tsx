import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/features/main/NavBar';

const CreatePostPage = () => {
   const [title, setTitle] = useState('');
   const [content, setContent] = useState('');
   const navigate = useNavigate();

   const { mutate, isPending } = useMutation({
      mutationFn: async () => {
         const res = await fetch(
            `${process.env.BUN_PUBLIC_BACKEND_URL}/api/v1/blogs`,
            {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               credentials: 'include',
               body: JSON.stringify({ title, content }),
            },
         );
         const data = await res.json();
         if (!res.ok) {
            throw new Error(data.error ?? 'Failed to create post');
         }
         return data;
      },
      onSuccess: () => {
         navigate('/');
      },
   });

   return (
      <div>
         <NavBar />
         <div className="max-w-175 mx-auto p-4 md:p-6 flex flex-col gap-4 md:gap-6 mt-4 md:mt-8">
            <Input
               placeholder="Title"
               value={title}
               onChange={(e) => setTitle(e.target.value)}
               className="text-3xl md:text-4xl border-none outline-none shadow-none font-semibold focus-visible:ring-0 px-0 placeholder:text-zinc-300 h-auto"
            />
            <Textarea
               placeholder="Tell your story..."
               value={content}
               onChange={(e) => setContent(e.target.value)}
               className="text-lg md:text-xl font-serif border-none outline-none shadow-none focus-visible:ring-0 px-0 min-h-75 resize-none placeholder:text-zinc-400 leading-relaxed text-zinc-800"
            />
            <div className="flex justify-end mt-4">
               <Button
                  onClick={() => mutate()}
                  disabled={isPending || !title.trim() || !content.trim()}
                  className="rounded-full bg-green-600 hover:bg-green-700 text-white px-6"
               >
                  {isPending ? 'Publishing...' : 'Publish'}
               </Button>
            </div>
         </div>
      </div>
   );
};

export default CreatePostPage;
