import { Skeleton } from "@/components/ui/skeleton";

const LoadingPostId = () => {
  return (
    <article className="max-w-4xl w-full mx-auto px-4 sm:px-6 mt-10">
      {/* Back button */}
      <div className="mb-8">
        <Skeleton className="h-4 w-28" />
      </div>

      {/* Hero image — mirrors: relative w-full aspect-video rounded-xl overflow-hidden glass-card */}
      <div className="relative w-full aspect-video rounded-xl overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full" />
      </div>

      {/* Meta — mirrors: mt-10 space-y-3 */}
      <div className="mt-10 space-y-3">
        {/* Tags + read time — mirrors: flex items-center flex-wrap gap-2 */}
        <div className="flex items-center flex-wrap gap-2">
          <Skeleton className="h-[26px] w-20 rounded-full" />
          <Skeleton className="h-[26px] w-24 rounded-full" />
        </div>

        {/* Title — mirrors: h1 text-2xl sm:text-3xl md:text-4xl */}
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-4/5" />

        {/* Author + date + presence — mirrors: flex items-center flex-wrap gap-3 */}
        <div className="flex items-center flex-wrap gap-3">
          {/* "By authorId" */}
          <Skeleton className="h-3.5 w-24" />
          {/* separator: h-3.5 w-px hidden sm:block */}
          <Skeleton className="h-3.5 w-px hidden sm:block" />
          {/* Clock + date */}
          <Skeleton className="h-3.5 w-36" />
          {/* Presence avatars — mirrors: flex items-center sm:ml-auto */}
          <div className="flex items-center sm:ml-auto">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-6 w-6 rounded-full -ml-1" />
          </div>
        </div>
      </div>

      {/* Divider — mirrors: my-10 flex items-center gap-4 */}
      <div className="my-10 flex items-center gap-4">
        <Skeleton className="h-px flex-1" />
        <Skeleton className="w-1.5 h-1.5 rounded-full" />
        <Skeleton className="h-px flex-1" />
      </div>

      {/* Content — mirrors: prose-dark > p text-sm sm:text-base font-mono leading-7 */}
      <div className="prose-dark space-y-[calc(1.75rem-1.25rem)]">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-11/12" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-2/3" />
      </div>

      {/* Divider — mirrors: my-10 flex items-center gap-4 */}
      <div className="my-10 flex items-center gap-4">
        <Skeleton className="h-px flex-1" />
        <Skeleton className="w-1.5 h-1.5 rounded-full" />
        <Skeleton className="h-px flex-1" />
      </div>

      {/* Comments — mirrors: mt-6 pb-10 */}
      <div className="mt-6 pb-10">
        {/* CommentSection internals */}
        <div className="space-y-6">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-28 w-full rounded-xl" />
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-4">
              <Skeleton className="h-8 w-8 rounded-full shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-3.5 w-24" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
};

export default LoadingPostId;
