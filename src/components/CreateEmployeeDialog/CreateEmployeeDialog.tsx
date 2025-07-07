import { useState } from 'react'
import { useEmployeesContext } from '@/context/employee'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Button
} from '@/components'
import { Plus } from 'lucide-react'
import { EmployeeFormValues } from '@/types/employee'
import EmployeeForm from '../EmployeeForm/EmployeeForm'
import { toast } from "sonner"

const CreateEmployeeDialog = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { create } = useEmployeesContext();

  const handleCreate = async (data: EmployeeFormValues) => {
    await create(data)
    toast.success("Employee has been created")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="cursor-pointer" onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create New
        </Button>
      </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Employee</DialogTitle>
          <DialogDescription>
            Enter details and click <strong>Submit</strong>.
          </DialogDescription>
        </DialogHeader>
       <EmployeeForm onSubmit={handleCreate} />
      </DialogContent>
    </Dialog>
  )
}

export default CreateEmployeeDialog