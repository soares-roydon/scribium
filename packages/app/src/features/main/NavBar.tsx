import Scribium from '../home/components/Scribium';
import ProfileIcon from './icons/ProfileIcon';
import WriteIcon from './icons/WriteIcon';
import { Link } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';
import Bars from './icons/Bars';

const NavBar = ({
   setIsCollapsed,
   isCollapsed,
}: {
   setIsCollapsed?: (isCollapsed: boolean) => void;
   isCollapsed?: boolean;
}) => {
   return (
      <div className="flex justify-between items-center border-b border-zinc-100 py-3 px-4 md:px-6 bg-white">
         <div className="flex items-center gap-3 md:gap-4">
            {setIsCollapsed && (
               <div
                  className="cursor-pointer"
                  onClick={() => setIsCollapsed(!isCollapsed)}
               >
                  <Bars />
               </div>
            )}
            <Scribium />
            <div className="hidden md:flex items-center bg-zinc-50 hover:bg-zinc-100 transition-colors rounded-full px-4 py-2 text-zinc-500 text-sm ml-2 w-64">
               <Search
                  className="w-5 h-5 mr-3 text-zinc-400"
                  strokeWidth={1.5}
               />
               <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent border-none outline-none w-full placeholder:text-zinc-500"
               />
            </div>
         </div>
         <div className="flex items-center gap-4 md:gap-6 text-sm text-zinc-600">
            <Link
               to="/new"
               className="flex items-center gap-2 hover:text-black"
            >
               <WriteIcon />
               <div className="hidden md:block">Write</div>
            </Link>
            <div className="cursor-pointer">
               <ProfileIcon />
            </div>
         </div>
      </div>
   );
};

export default NavBar;
