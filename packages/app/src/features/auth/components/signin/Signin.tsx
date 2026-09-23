import { useState } from 'react';
import InputBox from '../InputBox';
import { Button } from '@/components/ui/button';
import SigninPasswordStep from './SigninPasswordStep';
import type { SigninInput } from '@scribium/shared';

const Signin = ({ onSwitchSignup }: { onSwitchSignup: () => void }) => {
   const [user, setUser] = useState<SigninInput>({
      email: '',
      password: '',
   });
   const [step, setStep] = useState<'email' | 'password'>();

   return (
      <>
         {step === 'password' ? (
            <SigninPasswordStep
               onSwitchSignup={onSwitchSignup}
               user={user}
               setUser={setUser}
            />
         ) : (
            <>
               <div className="font-serif text-xl text-center my-6 font-light">
                  Sign in with email
               </div>
               <div className="flex flex-col gap-4 mt-10">
                  <InputBox
                     text={'Your email'}
                     placeholder={'Your email address'}
                     onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                     }
                  />
                  <Button
                     onClick={() => setStep('password')}
                     disabled={!user.email.trim()}
                  >
                     Continue
                  </Button>
               </div>
               <div className="mt-10 text-center text-sm">
                  Don't have an account?{' '}
                  <span
                     className="underline cursor-pointer"
                     onClick={onSwitchSignup}
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
