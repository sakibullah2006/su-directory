import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <article className="container max-w-3xl py-6 lg:py-12 mx-auto px-4">
            {/* Cover Image Skeleton */}
            <div className="relative bg-white rounded-lg shadow-sm mb-6 overflow-hidden h-64">
                <Skeleton className="h-full w-full" />
            </div>

            {/* Author and Date Skeleton */}
            <div className="flex items-center gap-3 mb-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-32" />
                </div>
            </div>

            {/* Like Button Skeleton */}
            <div className="mb-4">
                <Skeleton className="h-8 w-20 rounded-full" />
            </div>

            {/* Title Skeleton */}
            <Skeleton className="h-9 w-3/4 mb-4" />

            {/* Tags Skeleton */}
            <div className="flex flex-wrap gap-2 mb-6">
                <Skeleton className="h-6 w-16 rounded-full" />
            </div>

            <Separator className="my-6" />

            {/* Content Skeleton - Multiple paragraphs */}
            <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />

                <div className="py-2"></div>

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />

                <div className="py-2"></div>

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />

                <div className="py-2"></div>

                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-11/12" />
            </div>

            <Separator className="my-8" />

            {/* Comments Section Skeleton */}
            <div className="space-y-4">
                <Skeleton className="h-6 w-32 mb-4" />

                {/* Comment input skeleton */}
                <Skeleton className="h-24 w-full rounded-md mb-6" />

                {/* Individual comments skeletons */}
                {[1, 2].map((_, index) => (
                    <div key={index} className="flex gap-3 mb-6">
                        <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                        <div className="space-y-2 w-full">
                            <div className="flex justify-between">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-5/6" />
                        </div>
                    </div>
                ))}
            </div>
        </article>
    )
}
