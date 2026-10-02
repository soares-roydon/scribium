import { Sidebar } from './Sidebar';
import NavBar from '../../features/main/NavBar';
import { useState, useEffect } from 'react';

interface MainLayoutProps {
   children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
   const [isCollapsed, setIsCollapsed] = useState(
      () => window.innerWidth < 768,
   );

   useEffect(() => {
      const handleResize = () => {
         if (window.innerWidth < 768) {
            setIsCollapsed(true);
         } else {
            setIsCollapsed(false);
         }
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
   }, []);

   return (
      <div className="flex flex-col h-screen overflow-hidden bg-white">
         <div className="z-30 bg-white border-b border-zinc-100 shrink-0">
            <NavBar setIsCollapsed={setIsCollapsed} isCollapsed={isCollapsed} />
         </div>
         <div className="flex flex-1 overflow-hidden">
            <Sidebar isCollapsed={isCollapsed} />
            <div className="flex-1 overflow-y-auto transition-all duration-300">
               <main className="max-w-7xl mx-auto w-full">{children}</main>
            </div>
         </div>
      </div>
   );
}
