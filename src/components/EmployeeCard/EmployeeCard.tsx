import { FC } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
  Button,
  Avatar,
  AvatarFallback,
} from "@/components";
import { Eye } from "lucide-react";
import { useNavigate } from 'react-router';
import { Employee } from '@/types/employee';

interface EmployeeCardProps extends Employee {};

const EmployeeCard: FC<EmployeeCardProps> = ({
  id,
  firstName,
  lastName,
  email,
  jobTitle,
}) => {
  const navigate = useNavigate();
  return (
    <Card data-testid="employee-card" className="flex flex-col border hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <CardHeader className="flex items-center space-x-4 p-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback>
            {firstName[0]}
            {lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">
            {firstName} {lastName}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            {jobTitle}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1 px-4">
        <p className="text-sm text-muted-foreground">
          <a href={`mailto:${email}`} className="hover:underline">
            {email}
          </a>
        </p>
      </CardContent>

      <CardFooter className="flex justify-end space-x-2">
        <Button size="sm" variant="outline" onClick={() => navigate(`/employee/${id}`)} className="cursor-pointer">
          <Eye className="mr-1 h-4 w-4" />
          View
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EmployeeCard;