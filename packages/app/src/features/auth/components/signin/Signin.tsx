import { useState } from 'react';
import InputBox from '../InputBox';
import { Button } from '@/components/ui/button';
import Continue from './Continue';
import Signup from '../signup/Signup';

const Signin = () => {
   const [shouldContinue, setShouldContinue] = useState<Boolean>(false);
   const [isSignupPageShown, setIsSignupPageShown] = useState<Boolean>(false);

   if (isSignupPageShown) {
      return <Signup />;
   }

   return (
      <>
         {shouldContinue ? (
            <Continue />
         ) : (
            <>
               <div className="font-serif text-xl text-center my-6 font-light">
                  Sign in with email
               </div>
               <div className="flex flex-col gap-4 mt-10">
                  <InputBox
                     text={'Your email'}
                     placeholder={'Your email address'}
                  />
                  <Button onClick={() => setShouldContinue(true)}>
                     Continue
                  </Button>
               </div>
               <div className="mt-10 text-center text-sm">
                  Don't have an account?{' '}
                  <span
                     className="underline cursor-pointer"
                     onClick={() => {
                        setIsSignupPageShown(true);
                     }}
                  >
                     Sign up
                  </span>
               </div>
            </>
         )}
      </>
   );
};

export default Signin;
