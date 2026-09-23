import { Button } from '@/components/ui/button';
import homeImage from '../asset/home.svg';

const Main = () => {
   return (
      <div className="flex justify-between items-center h-full px-6 md:px-12 lg:pl-20 2xl:pl-60 bg-[#F7F4ED] border-b border-black">
         <div>
            <div className="text-6xl lg:text-7xl xl:text-8xl font-serif leading-none tracking-tighter text-black max-w-160 mb-8">
               Human stories & ideas
            </div>
            <div className="text-2xl text-black/80 max-w-lg mb-12">
               A place to read, write, and deepen your understanding
            </div>
            <Button className="bg-black text-white hover:bg-black/90 px-8 py-6 text-xl">
               Start reading
            </Button>
         </div>
         <img
            className="hidden lg:block w-100 xl:w-125"
            src={homeImage}
            alt="Home"
         />
      </div>
   );
};

export default Main;
