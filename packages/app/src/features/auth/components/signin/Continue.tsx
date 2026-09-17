import InputBox from '../InputBox';
import { Button } from '@/components/ui/button';

const Continue = () => {
   return (
      <>
         <div className="font-serif text-xl text-center my-6 font-light">
            Sign in with email
         </div>
         <div className="flex flex-col gap-4 mt-10">
            <InputBox text={'Your password'} placeholder={'Your password'} />
            <Button>Continue</Button>
            <div className="mt-10 text-center text-sm">
               Don't have an account?{' '}
               <span className="underline cursor-pointer">Sign up</span>
            </div>
         </div>
      </>
   );
};

export default Continue;
