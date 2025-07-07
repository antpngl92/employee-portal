import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardFooter, 
  Skeleton 
} from "@/components";

const EmployeeCardSkeleton = () => {
  return (
<Card data-testid="employee-card-skeleton" className="flex flex-col border rounded-lg overflow-hidden animate-pulse">
    <CardHeader className="flex items-center space-x-4 p-4">
      <Skeleton className="h-12 w-12 rounded-full" />

      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-24 rounded-md" />  
        <Skeleton className="h-3 w-16 rounded-md" />
      </div>
    </CardHeader>

    <CardContent className="flex-1 px-4">
      <Skeleton className="h-4 w-3/4 rounded-md" />
    </CardContent>

    <CardFooter className="flex justify-end p-4">
      <Skeleton className="h-8 w-20 rounded-md" />
    </CardFooter>
  </Card>
  );
}

export default EmployeeCardSkeleton
