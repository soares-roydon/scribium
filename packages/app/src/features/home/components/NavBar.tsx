import { Button } from '@/components/ui/button';
import Scribium from './Scribium';
import { useState } from 'react';
import AuthLayout from '@/features/auth/layout/AuthLayout';

const NavBar = () => {
   const [isSignupShown, setIsSignupShown] = useState(false);
   const [isSigninShown, setIsSigninShown] = useState(false);

   return (
      <div className="flex justify-between px-6 py-3 border-b border-black md:px-12 lg:px-30 2xl:px-60">
         <Scribium />
         <div className="flex gap-2">
            <Button
               className={'hidden font-normal sm:block'}
               variant={'link'}
               onClick={() => setIsSigninShown(true)}
            >
               Sign in
            </Button>
            <Button onClick={() => setIsSignupShown(true)}>Get Started</Button>
         </div>

         {isSignupShown ? (
            <AuthLayout authType="signup" setAuthShown={setIsSignupShown} />
         ) : null}

         {isSigninShown ? (
            <AuthLayout authType="signin" setAuthShown={setIsSigninShown} />
         ) : null}
      </div>
   );
};

export default NavBar;
