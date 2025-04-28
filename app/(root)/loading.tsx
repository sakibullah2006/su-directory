import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <>
            <section className="pink_container pattern-grid animate-pattern gradient-bg relative overflow-hidden flex flex-col items-center justify-evenly">
                {/* Decorative elements
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white/10 blur-xl"></div>
                    <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white/10 blur-xl"></div>
                </div> */}

                {/* Hero heading skeleton */}
                <div className=" p-6 mb-4">
                    <Skeleton className="h-14 w-[600px] mb-2" />
                    <Skeleton className="h-14 w-[600px] " />
                </div>

                {/* Subtitle skeleton */}
                <Skeleton className="h-8 w-[700px] mb-8" />

                {/* Optional decorative element */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

                {/* Search bar skeleton */}
                <div className="mt-8 w-full max-w-2xl mx-auto flex justify-center mb-8">
                    <div className="relative w-full">
                        <Skeleton className="h-12 w-full rounded-full" />
                        <div className="absolute right-1 top-1">
                            <Skeleton className="h-10 w-10 rounded-full" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="section_container space-y-4">
                {/* Section title skeleton */}
                <Skeleton className="h-10 w-40" />

                {/* Cards grid skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(5)
                        .fill(null)
                        .map((_, index) => (
                            <div key={index} className="flex flex-col p-6 border rounded-lg shadow-sm">
                                {/* Card title */}
                                <Skeleton className="h-7 w-3/4 mb-4" />

                                {/* Author row */}
                                <div className="flex items-center mb-4">
                                    <Skeleton className="h-10 w-10 rounded-full mr-3" />
                                    <Skeleton className="h-5 w-20" />
                                    <Skeleton className="h-5 w-24 ml-auto" />
                                </div>

                                {/* Card description */}
                                <Skeleton className="h-4 w-full mb-1" />
                                <Skeleton className="h-4 w-full mb-1" />
                                <Skeleton className="h-4 w-4/5 mb-4" />

                                {/* Card image */}
                                <Skeleton className="h-[150px] w-full rounded-md mb-4" />

                                {/* Category tag */}
                                <div className="mb-4">
                                    <Skeleton className="h-8 w-20 rounded-full" />
                                </div>

                                {/* View post button */}
                                <Skeleton className="h-10 w-full rounded-md mt-auto" />
                            </div>
                        ))}
                </div>
            </section>
        </>
    )
}
