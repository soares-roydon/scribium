import InputBox from '../InputBox';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Continue from './Continue';
import Signin from '../signin/Signin';

const Signup = () => {
   const [shouldContinue, setShouldContinue] = useState<Boolean>(false);
   const [isSigninPageShown, setIsSigninPageShown] = useState<Boolean>(false);

   if (isSigninPageShown) {
      return <Signin />;
   }

   return (
      <>
         {shouldContinue ? (
            <Continue />
         ) : (
            <>
               <div className="font-serif text-xl text-center my-6 font-light">
                  Sign up with email
               </div>
               <div className="flex flex-col gap-4 mt-10">
                  <InputBox text={'Your full name'} placeholder={'Your name'} />
                  <InputBox
                     text={'Your email'}
                     placeholder={'Your email address'}
                  />
                  <Button onClick={() => setShouldContinue(true)}>
                     Continue
                  </Button>
               </div>
               <div className="mt-10 text-center text-sm">
                  Already have an account?{' '}
                  <span
                     className="underline cursor-pointer"
                     onClick={() => setIsSigninPageShown(true)}
                  >
                     Sign in
                  </span>
               </div>
            </>
         )}
      </>
   );
};

export default Signup;
