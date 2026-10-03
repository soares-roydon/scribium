import { type Dispatch, type SetStateAction, useEffect, useState } from 'react';
import emailIcon from '../../home/asset/email.svg';
import crossIcon from '../../home/asset/cross.svg';
import Signup from '../components/signup/Signup';
import Signin from '../components/signin/Signin';
import type { AuthType } from '../types/types';

interface Props {
   view: AuthType;
   setView: (view: AuthType) => void;
}

const AuthLayout = ({ view, setView }: Props) => {
   const [isOpen, setIsOpen] = useState(false);
   const [shouldRender, setShouldRender] = useState(false);
   const [lastView, setLastView] = useState<AuthType>('signup');

   useEffect(() => {
      if (view !== null) {
         setLastView(view);
         setShouldRender(true);
         // Use setTimeout to ensure the element is in the DOM before we trigger the opacity transition
         const timer = setTimeout(() => setIsOpen(true), 10);
         return () => clearTimeout(timer);
      } else {
         setIsOpen(false);
         // Wait for transition duration (200ms) before unmounting completely
         const timer = setTimeout(() => setShouldRender(false), 200);
         return () => clearTimeout(timer);
      }
   }, [view]);

   if (!shouldRender) return null;

   return (
      <div
         className={`flex items-center justify-center fixed inset-0 z-50 bg-black/50 transition-opacity duration-200 ease-out ${
            isOpen ? 'opacity-100' : 'opacity-0'
         }`}
      >
         <div
            className={`border rounded-md w-[95%] pt-2 px-4 pb-6 bg-white sm:w-140 shadow-lg transition-all duration-200 ease-out transform ${
               isOpen
                  ? 'scale-100 translate-y-0 opacity-100'
                  : 'scale-95 translate-y-4 opacity-0'
            }`}
         >
            <div className="flex justify-end">
               <img
                  className="size-7 font-bold cursor-pointer transition-transform hover:scale-110"
                  src={crossIcon}
                  onClick={() => setView(null)}
               />
            </div>
            <div className="flex justify-center">
               <img className="size-12" src={emailIcon} />
            </div>
            <div className="px-6 sm:px-20">
               {lastView === 'signup' ? (
                  <Signup onSwitchSignin={() => setView('signin')} />
               ) : (
                  <Signin onSwitchSignup={() => setView('signup')} />
               )}
            </div>
         </div>
      </div>
   );
};

export default AuthLayout;
