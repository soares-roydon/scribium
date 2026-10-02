import { NavLink } from 'react-router-dom';
import { Home, User } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar({ isCollapsed }: { isCollapsed: boolean }) {
   const navItems = [
      { path: '/', label: 'Home', icon: Home },
      { path: '/profile', label: 'Profile', icon: User },
   ];

   return (
      <aside
         className={cn(
            'h-full bg-white transition-all duration-300 ease-in-out overflow-hidden absolute md:relative z-50',
            isCollapsed
               ? 'w-0 border-r-0 opacity-0'
               : 'w-64 border-r opacity-100',
         )}
      >
         <div className="flex flex-col h-full w-64">
            <nav className="flex-1 px-4 mt-8">
               {navItems.map((item) => (
                  <NavLink
                     key={item.path}
                     to={item.path}
                     className={({ isActive }) =>
                        cn(
                           'flex items-center gap-4 px-3 py-3 rounded-xl transition-colors text-zinc-500 hover:text-black hover:bg-zinc-50',
                           isActive && 'text-black',
                        )
                     }
                  >
                     <item.icon
                        className="w-6 h-6 shrink-0"
                        strokeWidth={1.5}
                     />
                     <span className="">{item.label}</span>
                  </NavLink>
               ))}
            </nav>
         </div>
      </aside>
   );
}
