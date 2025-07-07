import { z } from "zod";

export const employeeSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName:  z.string().min(1, "Last name is required"),
  email:     z.string().email("Please enter a valid email"),
  jobTitle:  z.string().min(1, "Job title is required"),
});