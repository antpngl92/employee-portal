import { FC } from "react";
import { EmployeeCard } from "@/components";
import { Employee } from "@/types/employee";

interface EmployeesListProps {
  employees: Employee[];
}

const EmployeeList: FC<EmployeesListProps> = ({
  employees,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map((emp) => (
        <EmployeeCard
          key={emp.id}
          id={emp.id}
          firstName={emp.firstName}
          lastName={emp.lastName}
          email={emp.email}
          jobTitle={emp.jobTitle}
        />
      ))}
    </div>
  );
};

export default EmployeeList
