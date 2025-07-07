import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Button,
  EmployeeForm,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage
} from "@/components"
import { ChevronLeft, Trash2 } from "lucide-react";
import { useNavigate, useParams } from 'react-router';
import { useEmployeesContext } from '@/context/employee';
import { toast } from "sonner"
import { EmployeeFormValues } from '@/types/employee';
import NotFound from "./components/NotFound/NotFound";


const EmployeeDetails = () => {
  const navigate = useNavigate();
  const { loading, error, remove, update, employeeMap } = useEmployeesContext();
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id);
  const employee = employeeMap[employeeId]

  if (!employee) return <NotFound />
  if (loading) return <>Loading ...</>;
  if (error) return <p className="text-center py-8 text-red-600">{error}</p>;

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
      return;
    }
    try {
      await remove(employee.id);
      navigate('/');
      toast.success("Employee has been deleted")
    } catch {
      toast.warning('Failed to delete employee.');
    }
  };

  const handleSubmit = async (data: EmployeeFormValues) => {
    try {
      await update(employee.id, data);
      toast.success("Employee has been updated")
    } catch {
      toast.warning('Failed to update employee.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <Breadcrumb className='max-w-3xl mx-auto pb-4'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Employee List</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{`${employee.firstName} ${employee.lastName}`}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="max-w-3xl mx-auto overflow-hidden shadow-lg rounded-lg">
        <CardHeader className="flex items-center justify-between bg-white border-b px-6 py-4">
          <CardTitle className="text-2xl font-semibold">
            {employee?.firstName} {employee?.lastName}
          </CardTitle>
          <Button
            variant="ghost"
            onClick={handleDelete}
            className="transition hover:bg-red-50 rounded-full cursor-pointer"
          >
            <Trash2 className="h-5 w-5 text-red-500" />
          </Button>
        </CardHeader>

        <CardContent className="px-6 py-4">
          <EmployeeForm
            employee={employee}
            onSubmit={handleSubmit}
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default EmployeeDetails