import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { toast } from 'sonner'
import { CreateEmployeeDialog } from '@/components'

const employeeContextCreateMock = vi.fn()
vi.mock('@/context/employee', () => ({
  useEmployeesContext: () => ({
    create: employeeContextCreateMock,
  })
}))

vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
  },
  Toaster: () => null,
}))

describe('CreateEmployeeDialog', () => {
  const userObject = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      jobTitle: 'Tester',
  }
  beforeEach(() => {
    vi.clearAllMocks()
    employeeContextCreateMock.mockResolvedValue(userObject)
  })

  it('opens dialog, submits form, calls create and toast.success, then closes', async () => {
    render(<CreateEmployeeDialog />)

    await userEvent.click(screen.getByRole('button', { name: /create new/i }))
    expect(screen.getByRole('heading', { name: /create new employee/i })).toBeVisible()

    await userEvent.type(screen.getByPlaceholderText(/first name/i), 'Test')
    await userEvent.type(screen.getByPlaceholderText(/last name/i), 'User')
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'test@example.com')
    await userEvent.type(screen.getByPlaceholderText(/job title/i), 'Tester')

    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(employeeContextCreateMock).toHaveBeenCalledOnce()
    expect(employeeContextCreateMock).toHaveBeenCalledWith(userObject)

    expect(toast.success).toHaveBeenCalledOnce()
    expect(toast.success).toHaveBeenCalledWith('Employee has been created')

    await waitFor(() =>
      expect(screen.queryByRole('heading', { name: /create new employee/i })).toBeNull()
    )
  })

  it('keeps dialog open on empty form submit', async () => {
    render(<CreateEmployeeDialog />)

    await userEvent.click(screen.getByRole('button', { name: /create new/i }))
    expect(screen.getByRole('heading', { name: /create new employee/i })).toBeVisible()

    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(screen.getByRole('heading', { name: /create new employee/i })).toBeVisible()

    expect(employeeContextCreateMock).not.toHaveBeenCalled()
    expect(toast.success).not.toHaveBeenCalled()
  })
})