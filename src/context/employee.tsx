import { 
    FC, 
    createContext, 
    useContext, 
    useState, 
    useEffect, 
    useCallback, 
    ReactNode 
} from "react";
import {
  listEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "@/api/employee";
import { Employee } from "@/types/employee";

interface EmployeesContextValue {
  employees: Employee[];
  employeeMap: Record<number, Employee>;
  loading: boolean;
  error: string | null;
  create: (data: Omit<Employee, "id">) => Promise<Employee>;
  update: (id: number, data: Omit<Employee, "id">) => Promise<Employee>;
  remove: (id: number) => Promise<void>;
  refresh: () => Promise<void>;
}

const EmployeesContext = createContext<EmployeesContextValue | undefined>(undefined);

export const EmployeesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeMap, setEmployeeMap] = useState<Record<number, Employee>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await listEmployees();
      setEmployees(data);
      const map = Object.fromEntries(data.map(emp => [emp.id, emp]));
      setEmployeeMap(map);
    } catch (err) {
      console.error(err);
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  }, []);

  // TODO: change type to form data type
  const create = useCallback(async (data: any) => {
    setLoading(true);
    try {
      const newEmp = await createEmployee(data);
      setEmployees((prev) => [newEmp, ...prev]);
      setEmployeeMap(prev => ({ ...prev, [newEmp.id]: newEmp }));
      return newEmp;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // TODO: change type to form data type
  const update = useCallback(async (id: number, data: any) => {
    setLoading(true);
    try {
      const updated = await updateEmployee(id, data);
      setEmployees((prev) => prev.map((e) => (e.id === id ? updated : e)));
      setEmployeeMap(prev => ({ ...prev, [id]: updated }));
      return updated;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const remove = useCallback(async (id: number) => {
    setLoading(true);
    try {
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
      setEmployeeMap(prev => {
        const { [id]: _, ...rest } = prev;
        return rest;
      });
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = fetchEmployees;

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  return (
    <EmployeesContext.Provider
      value={{ employees, loading, error, create, update, remove, refresh, employeeMap }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};

export function useEmployeesContext(): EmployeesContextValue {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error("useEmployeesContext must be used within EmployeesProvider");
  }
  return context;
}