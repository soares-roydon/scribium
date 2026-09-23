import { Button } from '@/components/ui/button';
import Scribium from './Scribium';
import { useState } from 'react';
import AuthLayout from '@/features/auth/layout/AuthLayout';
import type { AuthType } from '@/features/auth/types/types';

const NavBar = () => {
   const [view, setView] = useState<AuthType>(null);

   return (
      <div className="flex justify-between items-center px-6 py-4 border-b border-black md:px-12 lg:px-30 2xl:px-60 bg-[#F7F4ED]">
         <Scribium />
         <div className="flex items-center gap-6 text-sm ">
            <div
               className="hidden sm:block cursor-pointer hover:font-medium"
               onClick={() => setView('signin')}
            >
               Sign In
            </div>
            <Button
               className="bg-black text-white hover:bg-black/90 px-4"
               onClick={() => setView('signup')}
            >
               Get started
            </Button>
         </div>

         <AuthLayout view={view} setView={setView} />
      </div>
   );
};

export default NavBar;
