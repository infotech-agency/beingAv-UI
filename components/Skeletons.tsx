export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-lg border border-border bg-white shadow-sm"
        >
          <div className="aspect-[4/3] animate-pulse bg-secondary" />
          <div className="p-5">
            <div className="h-5 w-3/4 animate-pulse rounded bg-secondary" />
            <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-secondary" />
            <div className="mt-4 h-3 w-full animate-pulse rounded bg-secondary" />
            <div className="mt-6 h-8 w-28 animate-pulse rounded bg-secondary" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function BlogGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="overflow-hidden rounded-lg border border-border bg-white shadow-sm"
        >
          <div className="aspect-[16/9] animate-pulse bg-secondary" />
          <div className="p-5">
            <div className="h-3 w-1/2 animate-pulse rounded bg-secondary" />
            <div className="mt-3 h-5 w-3/4 animate-pulse rounded bg-secondary" />
            <div className="mt-2 h-3 w-full animate-pulse rounded bg-secondary" />
          </div>
        </div>
      ))}
    </div>
  );
}
