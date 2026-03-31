export default function CabinCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg animate-pulse">
      <div className="h-48 w-full bg-gray-200" />
      <div className="p-6">
        <div className="mb-4 h-6 w-3/4 rounded bg-gray-200" />
        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-5/6 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
