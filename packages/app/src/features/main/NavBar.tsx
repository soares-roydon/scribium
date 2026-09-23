import Scribium from '../home/components/Scribium';
import ProfileIcon from './icons/ProfileIcon';
import WriteIcon from './icons/WriteIcon';
import { Link } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';

const NavBar = () => {
   return (
      <div className="flex justify-between items-center border-b border-zinc-100 py-3 px-6 bg-white">
         <div className="flex items-center gap-4">
            <Scribium />
            <div className="hidden md:flex items-center bg-zinc-50 hover:bg-zinc-100 transition-colors rounded-full px-4 py-2.5 text-zinc-500 text-sm ml-2 w-64">
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
         <div className="flex items-center gap-6 text-sm text-zinc-600">
            <Link
               to="/new"
               className="flex items-center gap-2 hover:text-black"
            >
               <WriteIcon />
               <div>Write</div>
            </Link>
            <Bell
               className="w-6 h-6 text-zinc-500 hover:text-black cursor-pointer"
               strokeWidth={1.5}
            />
            <div className="cursor-pointer">
               <ProfileIcon />
            </div>
         </div>
      </div>
   );
};

export default NavBar;
