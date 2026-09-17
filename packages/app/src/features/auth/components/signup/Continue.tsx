import InputBox from '../InputBox';
import { Button } from '@/components/ui/button';

const Continue = () => {
   return (
      <>
         <div className="font-serif text-xl text-center my-6 font-light">
            Sign up with email
         </div>
         <div className="flex flex-col gap-4 mt-10">
            <InputBox text={'Your password'} placeholder={'Your password'} />
            <Button>Sign up</Button>
            <div className="mt-10 text-center text-sm">
               Already have an account?{' '}
               <span className="underline cursor-pointer">Sign up</span>
            </div>
         </div>
      </>
   );
};

export default Continue;
