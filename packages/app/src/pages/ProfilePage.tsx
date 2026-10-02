import { useQuery } from '@tanstack/react-query';
import MainLayout from '@/components/layout/MainLayout';

const ProfilePage = () => {
   const {
      data: user,
      isPending,
      isError,
   } = useQuery({
      queryKey: ['user'],
      queryFn: async () => {
         const res = await fetch(
            `${process.env.BUN_PUBLIC_BACKEND_URL}/api/v1/user`,
            {
               credentials: 'include',
            },
         );
         if (!res.ok) {
            throw new Error('Not authenticated');
         }
         return res.json();
      },
      retry: false,
   });

   if (isPending) {
      return (
         <MainLayout>
            <div className="flex justify-center mt-20">Loading profile...</div>
         </MainLayout>
      );
   }

   if (isError || !user) {
      return (
         <MainLayout>
            <div className="flex justify-center mt-20">
               Error loading profile. Please log in.
            </div>
         </MainLayout>
      );
   }

   return (
      <MainLayout>
         <div className="max-w-3xl mx-auto mt-6 md:mt-10 px-4 md:px-6">
            <div className="flex items-start gap-4 md:gap-6 mb-8 md:mb-10">
               <div className="w-16 h-16 md:w-24 md:h-24 shrink-0 bg-zinc-200 rounded-full flex items-center justify-center text-2xl md:text-4xl font-serif text-zinc-600">
                  {user.user?.name?.charAt(0).toUpperCase() || 'U'}
               </div>
               <div className="flex flex-col gap-1">
                  <h1 className="text-2xl md:text-3xl font-bold">
                     {user.user?.name || 'User Name'}
                  </h1>
                  <p className="text-sm md:text-base text-zinc-500">
                     {user.user?.email}
                  </p>

                  {user.user?.bio && (
                     <p className="text-sm md:text-base text-zinc-700 mt-1 md:mt-2">
                        {user.user?.bio}
                     </p>
                  )}

                  <div className="flex gap-4 mt-3 md:mt-4 text-xs md:text-sm text-zinc-600">
                     <span className="cursor-pointer hover:text-black transition-colors">
                        <strong className="text-black font-medium">
                           {user.user?.followers ?? 0}
                        </strong>{' '}
                        Followers
                     </span>
                     <span className="cursor-pointer hover:text-black transition-colors">
                        <strong className="text-black font-medium">
                           {user.user?.following ?? 0}
                        </strong>{' '}
                        Following
                     </span>
                  </div>
               </div>
            </div>

            <div className="border-b border-zinc-200 mb-6 flex gap-6">
               <button className="pb-4 border-b-2 border-black font-medium text-sm">
                  Home
               </button>
               <button className="pb-4 text-zinc-500 font-medium text-sm">
                  About
               </button>
            </div>

            <div className="text-zinc-500 text-center py-20 bg-zinc-50 rounded-xl">
               No stories published yet.
            </div>
         </div>
      </MainLayout>
   );
};

export default ProfilePage;
