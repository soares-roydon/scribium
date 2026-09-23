import type { SigninInput } from '@scribium/shared';
import InputBox from '../InputBox';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import Toast from '../Toast';

interface Props {
   onSwitchSignup: () => void;
   user: SigninInput;
   setUser: (user: SigninInput) => void;
}

const SigninPasswordStep = ({ onSwitchSignup, user, setUser }: Props) => {
   const { data, isError, isSuccess, error, mutate } = useMutation({
      mutationFn: handleSignin,
   });

   async function handleSignin() {
      return await fetch(
         `${process.env.BUN_PUBLIC_BACKEND_URL}/api/v1/user/signin`,
         {
            method: 'POST',
            headers: {
               'Content-type': 'application/json',
            },
            body: JSON.stringify(user),
         },
      ).then(async (res) => {
         const data = await res.json();

         if (!res.ok) {
            throw new Error(data.error ?? 'Signin failed');
         }

         return data;
      });
   }

   return (
      <>
         <div className="font-serif text-xl text-center my-6 font-light">
            Sign in with email
         </div>
         <div className="flex flex-col gap-4 mt-10">
            <InputBox
               text={'Your password'}
               placeholder={'Your password'}
               onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            {isError ? <Toast type={'error'} message={error.message} /> : null}
            {isSuccess ? (
               <Toast type={'success'} message={data.message} />
            ) : null}

            <Button onClick={() => mutate()} disabled={!user.password.trim()}>
               Sign in
            </Button>
            <div className="mt-10 text-center text-sm">
               Don't have an account?{' '}
               <span
                  className="underline cursor-pointer"
                  onClick={onSwitchSignup}
               >
                  Sign up
               </span>
            </div>
         </div>
      </>
   );
};

export default SigninPasswordStep;
