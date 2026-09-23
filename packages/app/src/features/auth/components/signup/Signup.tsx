import InputBox from '../InputBox';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import SignupPasswordStep from './SignupPasswordStep';
import type { SignupInput } from '@scribium/shared';

const Signup = ({ onSwitchSignin }: { onSwitchSignin: () => void }) => {
   const [user, setUser] = useState<SignupInput>({
      name: '',
      email: '',
      password: '',
   });
   const [step, setStep] = useState<'email' | 'password'>();

   return (
      <>
         {step === 'password' ? (
            <SignupPasswordStep
               onSwitchSignin={onSwitchSignin}
               user={user}
               setUser={setUser}
            />
         ) : (
            <>
               <div className="font-serif text-xl text-center my-6 font-light">
                  Sign up with email
               </div>
               <div className="flex flex-col gap-4 mt-10">
                  <InputBox
                     text={'Your full name'}
                     placeholder={'Your name'}
                     onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                     }
                  />
                  <InputBox
                     text={'Your email'}
                     placeholder={'Your email address'}
                     onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                     }
                  />
                  <Button
                     onClick={() => setStep('password')}
                     disabled={!user.name.trim() || !user.email.trim()}
                  >
                     Continue
                  </Button>
               </div>
               <div className="mt-10 text-center text-sm">
                  Already have an account?{' '}
                  <span
                     className="underline cursor-pointer"
                     onClick={onSwitchSignin}
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
