import Footer from '@/features/home/components/Footer';
import Main from '@/features/home/components/Main';
import NavBar from '@/features/home/components/NavBar';
import Blogs from '@/features/main/Blogs';
import MainLayout from '@/components/layout/MainLayout';
import { useQuery } from '@tanstack/react-query';

const HomePage = () => {
   const { data: user, isPending: isUserPending } = useQuery({
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

   const { data: blogs, isSuccess: isBlogsSuccess } = useQuery({
      queryKey: ['blogs'],
      queryFn: async () => {
         const res = await fetch(
            `${process.env.BUN_PUBLIC_BACKEND_URL}/api/v1/blogs`,
         );
         const data = await res.json();
         if (!res.ok) {
            throw new Error(data.error ?? 'Error');
         }
         return data;
      },
      enabled: !!user,
   });

   if (isUserPending) {
      return null;
   }

   return (
      <>
         {user && isBlogsSuccess ? (
            <>
               <MainLayout>
                  <div className="flex justify-center px-4 sm:px-6 mb-20 mt-8">
                     <div className="w-full max-w-170">
                        <Blogs blogs={blogs} />
                     </div>
                  </div>
               </MainLayout>
            </>
         ) : (
            <div className="h-dvh flex flex-col justify-between bg-[#F7F4ED] relative">
               <NavBar />
               <Main />
               <Footer />
            </div>
         )}
      </>
   );
};

export default HomePage;
