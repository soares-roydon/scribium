import { useMutation } from '@tanstack/react-query';
import type { SignupInput } from '@scribium/shared';
import InputBox from '../InputBox';
import { Button } from '@/components/ui/button';
import Toast from '../Toast';

interface Props {
   onSwitchSignin: () => void;
   user: SignupInput;
   setUser: (user: SignupInput) => void;
}

const SignupPasswordStep = ({ onSwitchSignin, user, setUser }: Props) => {
   const { data, isError, isPending, isSuccess, error, mutate } = useMutation({
      mutationFn: handleSignup,
      onSuccess: () => {
         window.location.reload();
      },
   });

   async function handleSignup() {
      return await fetch(
         `${process.env.BUN_PUBLIC_BACKEND_URL}/api/v1/user/signup`,
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
         },
      ).then(async (res) => {
         const data = await res.json();
         if (!res.ok) {
            throw new Error(data.error ?? 'Signup failed');
         }

         return data;
      });
   }

   return (
      <>
         <div className="font-serif text-xl text-center my-6 font-light">
            Sign up with email
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
               {isPending ? 'Signing up...' : 'Sign up'}
            </Button>
            <div className="mt-10 text-center text-sm">
               Already have an account?{' '}
               <span
                  className="underline cursor-pointer"
                  onClick={onSwitchSignin}
               >
                  Sign in
               </span>
            </div>
         </div>
      </>
   );
};

export default SignupPasswordStep;
