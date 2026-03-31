import CabinCardSkeleton from "@/app/_components/CabinCardSkeleton";

export default function Loading() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <div className="h-8 w-48 rounded bg-gray-200 animate-pulse mb-4" />
                <div className="h-4 w-96 rounded bg-gray-200 animate-pulse" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                    <CabinCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}
