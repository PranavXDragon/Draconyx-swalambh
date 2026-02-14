export function LoadingSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 bg-slate-200 rounded w-1/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="h-6 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="h-10 bg-slate-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
