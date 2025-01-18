import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

const StatCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="p-4">
        <Skeleton className="w-24 h-4 mb-2" /> {/* Title Skeleton */}
        <Skeleton className="w-32 h-8" /> {/* Amount Skeleton */}
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-2">
          <Skeleton className="w-12 h-6 rounded" /> {/* Badge Skeleton */}
          <Skeleton className="w-32 h-4" /> {/* Description Skeleton */}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCardSkeleton;
