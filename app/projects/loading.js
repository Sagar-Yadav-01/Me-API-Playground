import Skeleton from '@/components/Skeleton';

export default function Loading() {
    return (
        <div className="space-y-16 pb-24">
            <section className="space-y-10">
                <div className="space-y-6">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-20 w-3/4" />
                    <Skeleton className="h-12 w-1/2" />
                </div>
                <Skeleton className="h-16 w-full rounded-2xl" />
            </section>

            <div className="grid md:grid-cols-2 gap-12">
                {[1, 2, 3, 4].map(i => (
                    <Skeleton key={i} className="h-[500px] w-full rounded-[2.5rem]" />
                ))}
            </div>
        </div>
    );
}
