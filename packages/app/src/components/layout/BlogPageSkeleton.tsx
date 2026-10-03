const BlogPageSkeleton = () => {
   return (
      <div className="flex justify-center p-4">
         <div className="flex flex-col w-full max-w-170 mt-6 md:mt-10 overflow-hidden animate-pulse">
            {/* Title Skeleton */}
            <div className="h-10 md:h-12 bg-zinc-200 rounded-md w-3/4 mb-4" />
            <div className="h-10 md:h-12 bg-zinc-200 rounded-md w-2/3 mb-6" />

            {/* Author Skeleton */}
            <div className="flex gap-2 md:gap-4 items-start md:items-center mb-8">
               <div className="w-10 h-10 bg-zinc-200 rounded-full shrink-0" />
               <div className="flex flex-col gap-2 w-full">
                  <div className="h-4 bg-zinc-200 rounded-md w-32" />
                  <div className="h-3 bg-zinc-200 rounded-md w-24" />
               </div>
            </div>

            {/* Actions Skeleton */}
            <div className="flex gap-6 py-3 border-y border-zinc-100 mb-8 md:mb-10">
               <div className="h-6 bg-zinc-200 rounded-md w-16" />
               <div className="h-6 bg-zinc-200 rounded-md w-16" />
            </div>

            {/* Content Skeleton */}
            <div className="flex flex-col gap-3 mb-12">
               <div className="h-5 bg-zinc-200 rounded-md w-full" />
               <div className="h-5 bg-zinc-200 rounded-md w-full" />
               <div className="h-5 bg-zinc-200 rounded-md w-[95%]" />
               <div className="h-5 bg-zinc-200 rounded-md w-[90%]" />
               <div className="h-5 bg-zinc-200 rounded-md w-full" />
               <div className="h-5 bg-zinc-200 rounded-md w-3/4" />
               <div className="h-4 w-full my-1" />
               <div className="h-5 bg-zinc-200 rounded-md w-[90%]" />
               <div className="h-5 bg-zinc-200 rounded-md w-full" />
               <div className="h-5 bg-zinc-200 rounded-md w-[95%]" />
               <div className="h-5 bg-zinc-200 rounded-md w-2/3" />
            </div>
         </div>
      </div>
   );
};

export default BlogPageSkeleton;
