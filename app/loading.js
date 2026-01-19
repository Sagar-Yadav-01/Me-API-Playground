import Skeleton from '@/components/Skeleton';

export default function Loading() {
    return (
        <div className="relative space-y-32 pb-24 overflow-hidden">
            {/* Hero Skeleton */}
            <section className="min-h-[80vh] flex flex-col justify-center space-y-10 pt-12">
                <div className="space-y-6">
                    <Skeleton className="h-8 w-48 rounded-full" />
                    <Skeleton className="h-24 w-full md:w-3/4" />
                    <Skeleton className="h-24 w-1/2" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-12 w-2/3" />
                    <Skeleton className="h-12 w-1/2" />
                </div>
                <div className="flex gap-4">
                    <Skeleton className="h-16 w-40 rounded-2xl" />
                    <Skeleton className="h-16 w-16 rounded-2xl" />
                    <Skeleton className="h-16 w-16 rounded-2xl" />
                </div>
            </section>

            {/* Stats Skeleton */}
            <Skeleton className="h-40 w-full rounded-3xl" />

            {/* Expertise Skeleton */}
            <section className="space-y-16">
                <div className="flex flex-col items-center space-y-4">
                    <Skeleton className="h-12 w-64" />
                    <Skeleton className="h-2 w-20 rounded-full" />
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map(i => (
                        <Skeleton key={i} className="h-80 w-full rounded-3xl" />
                    ))}
                </div>
            </section>
        </div>
    );
}
