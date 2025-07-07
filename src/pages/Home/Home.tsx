import { EmployeeList } from "@/components";
import { useEmployeesContext } from "@/context/employee";

const Home = () => {
  const { employees, loading, error } = useEmployeesContext();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-6 space-y-4 lg:space-y-0">
        <h1 className="text-3xl font-bold leading-tight">
          Employee Directory
        </h1>
      </div>


      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          Loading ...
        </div>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <EmployeeList
          employees={employees}
        />
      )}
    </div>
  )
}

export default Home