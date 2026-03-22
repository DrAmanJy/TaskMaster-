import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const TaskListSkeleton = ({ taskLength }) => {
  const skeletonCount = Math.min(Math.max(taskLength, 3), 5);

  return (
    <div className="space-y-3">
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <Card key={i} className="w-full">
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Skeleton className="mt-1 h-5 w-5 rounded-full" />
              <div className="grid gap-2 flex-1">
                <div className="flex items-start justify-between gap-4">
                  <Skeleton className="h-5 w-1/3" />
                  <div className="flex items-center gap-1">
                    <Skeleton className="h-8 w-8 rounded-md" />
                    <Skeleton className="h-8 w-8 rounded-md" />
                  </div>
                </div>
                <Skeleton className="h-4 w-2/3" />
                <div className="flex items-center gap-2 mt-2">
                  <Skeleton className="h-5 w-16" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-5 w-24 ml-auto" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
