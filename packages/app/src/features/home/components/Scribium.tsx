import { cn } from '@/lib/utils';

const Scribium = ({ className }: { className?: string }) => {
   return (
      <div
         className={cn(
            'font-serif font-bold text-3xl tracking-tighter',
            className,
         )}
      >
         Scribium
      </div>
   );
};

export default Scribium;
