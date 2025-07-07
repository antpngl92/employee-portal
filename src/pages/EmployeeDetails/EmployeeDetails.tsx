import { useNavigate, useParams } from 'react-router';
import { useEmployeesContext } from '@/context/employee';
import { toast } from "sonner"
import { EmployeeFormValues } from '@/types/employee';


const EmployeeDetails = () => {
  const navigate = useNavigate();
  const { loading, error, remove, update, employeeMap } = useEmployeesContext();
  const { id } = useParams<{ id: string }>();
  const employeeId = Number(id);
  const employee = employeeMap[employeeId]

  if (loading || !employee) return <>Loading ...</>;
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
    <div>EmployeeDetails</div>
  )
}

export default EmployeeDetails