import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function StartupCardSkeleton() {
  return (
    <Card className="overflow-hidden max-w-sm">
      {/* Image skeleton */}
      <Skeleton className="h-48 w-full rounded-none" />

      <CardHeader className="p-4">
        <div className="flex items-center gap-3 mb-2">
          {/* Author avatar skeleton */}
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex flex-col gap-1">
            {/* Author name skeleton */}
            <Skeleton className="h-4 w-24" />
            {/* Date skeleton */}
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        {/* Title skeleton */}
        <Skeleton className="h-6 w-full mt-2" />
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {/* Description skeleton - multiple lines */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {/* Button skeleton */}
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}

