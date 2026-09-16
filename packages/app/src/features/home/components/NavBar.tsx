import { Button } from '@/components/ui/button';
import Scribium from './Scribium';

const NavBar = () => {
   return (
      <div className="flex justify-between px-6 py-3 border-b border-black md:px-12 lg:px-30 2xl:px-60">
         <Scribium />
         <div className="flex gap-2">
            <Button className={'hidden font-normal sm:block'} variant={'link'}>
               Sign in
            </Button>
            <Button>Get Started</Button>
         </div>
      </div>
   );
};

export default NavBar;
