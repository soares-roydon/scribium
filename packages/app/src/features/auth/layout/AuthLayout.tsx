import { type Dispatch, type SetStateAction } from 'react';
import emailIcon from '../../home/asset/email.svg';
import crossIcon from '../../home/asset/cross.svg';
import Signup from '../components/signup/Signup';
import Signin from '../components/signin/Signin';

type authType = 'signin' | 'signup';
interface Props {
   authType: authType;
   setAuthShown: Dispatch<SetStateAction<boolean>>;
}

const AuthLayout = ({ authType, setAuthShown }: Props) => {
   function closeAuth() {
      if (authType === 'signup') {
         setAuthShown(false);
      }

      if (authType === 'signin') {
         setAuthShown(false);
      }
   }

   return (
      <div className="flex items-center justify-center absolute inset-0 bg-black/50">
         <div className="border rounded-md w-150 pt-2 px-4 pb-6 bg-white">
            <div className="flex justify-end">
               <img
                  className="size-7 font-bold cursor-pointer"
                  src={crossIcon}
                  onClick={closeAuth}
               />
            </div>
            <div className="flex justify-center">
               <img className="size-12" src={emailIcon} />
            </div>
            <div className="px-20">
               {authType === 'signup' ? <Signup /> : <Signin />}
            </div>
         </div>
      </div>
   );
};

export default AuthLayout;
