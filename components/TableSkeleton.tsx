import { Skeleton } from "@/components/ui/skeleton"

export default function TableSkeleton() {
    return (
        <div className="w-full h-full space-y-3">
            <div className="flex space-x-4 w-full">
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 flex-1" />
                <Skeleton className="h-12 flex-1" />
            </div>
            <div className="space-y-2 w-full">
                {Array.from({ length: 10 }).map((_, index) => (
                    <div key={index} className="flex space-x-4 w-full">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 flex-1" />
                    </div>
                ))}
            </div>
        </div>
    )
}