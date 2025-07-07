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

const CreateEmployeeDialog = () => {
  const [open, setOpen] = useState<boolean>(false)
  const { create } = useEmployeesContext();

  // TODO: define data when form is ready
  const handleCreate = async (data: any) => {
    await create(data)
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
        {/* Employee form goes here */}
      </DialogContent>
    </Dialog>
  )
}

export default CreateEmployeeDialog