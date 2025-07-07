import { Button, Skeleton, Card, CardHeader, CardTitle, CardContent } from "@/components";
import { Trash2 } from "lucide-react";

const LoadingSkeleton = () => {
  return (
    <Card className="max-w-3xl mx-auto overflow-hidden shadow-lg rounded-lg">
      <CardHeader className="flex items-center justify-between bg-white border-b px-6 py-4">
        <CardTitle className="text-2xl font-semibold">
          <Skeleton className="h-6 w-48" />
        </CardTitle>
        <Button
          variant="ghost"
          disabled
          className="transition hover:bg-red-50 rounded-full cursor-default"
        >
          <Trash2 className="h-5 w-5 text-red-300" />
        </Button>
      </CardHeader>

      <CardContent className="px-6 py-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div>
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-10 w-full" />
        </div>

        <div className="flex justify-end pt-4">
          <Skeleton className="h-10 w-32" />
        </div>
      </CardContent>
    </Card>
  )
}

export default LoadingSkeleton