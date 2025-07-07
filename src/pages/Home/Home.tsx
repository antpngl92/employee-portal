import { useState } from "react";
import { EmployeeList, CreateEmployeeDialog, Input, Label } from "@/components";
import { useEmployeesContext } from "@/context/employee";
import { Search } from "lucide-react";

const Home = () => {
  const { employees, loading, error } = useEmployeesContext();
  const [filterQuery, setFilterQuery] = useState('')

  const filterEmployees = employees.filter((employee) => {
    const query = filterQuery.toLowerCase();

    return (
      employee.firstName.toLowerCase().includes(query) ||
      employee.lastName.toLowerCase().includes(query)
    )
  })

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <h1 className="text-3xl font-bold leading-tight">
          Employee Directory
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <Label htmlFor="filter" className="sr-only">
              Search employees
            </Label>
            <Input
              id="filter"
              placeholder="Search by name…"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>

          <CreateEmployeeDialog />
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          Loading ...
        </div>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <EmployeeList
          employees={filterEmployees}
        />
      )}
    </div>
  )
}

export default Home