import { employeeSchema } from "@/components/EmployeeForm/schema";
import z from "zod";

export type EmployeeFormValues = z.infer<typeof employeeSchema>;

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  jobTitle: string;
}