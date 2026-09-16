import { Button } from '@/components/ui/button';
import homeImage from '../asset/home.svg';

const Main = () => {
   return (
      <div className="flex justify-between items-center border h-full px-6 md:px-12 lg:pl-20 2xl:pl-60">
         <div>
            <div className="font-medium text-6xl max-w-lg lg:text-7xl font-serif xl:max-w-2xl xl:text-8xl">
               A Home for stories & ideas
            </div>
            <div className="my-12 text-xl">
               Read stories, share ideas, and see things differently
            </div>
            <Button className="bg-green-600 lg:bg-black">Start Reading</Button>
         </div>
         <img className="hidden size-130 lg:block" src={homeImage} />
      </div>
   );
};

export default Main;
