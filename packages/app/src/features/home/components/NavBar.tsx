import { Button } from '@/components/ui/button';
import Scribium from './Scribium';
import { useState } from 'react';
import AuthLayout from '@/features/auth/layout/AuthLayout';
import type { AuthType } from '@/features/auth/types/types';

const NavBar = () => {
   const [view, setView] = useState<AuthType>(null);

   return (
      <div className="flex justify-between px-6 py-3 border-b border-black md:px-12 lg:px-30 2xl:px-60">
         <Scribium />
         <div className="flex gap-2">
            <Button
               className={'hidden font-normal sm:block'}
               variant={'link'}
               onClick={() => setView('signin')}
            >
               Sign in
            </Button>
            <Button onClick={() => setView('signup')}>Get Started</Button>
         </div>

         <AuthLayout view={view} setView={setView} />
      </div>
   );
};

export default NavBar;
