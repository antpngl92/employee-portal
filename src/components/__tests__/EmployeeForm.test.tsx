import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import { EmployeeForm } from '@/components'

describe('EmployeeForm validation', () => {
  it('shows required errors and does not call onSubmit when empty', async () => {
    const onSubmit = vi.fn()
    render(<EmployeeForm onSubmit={onSubmit} />)


    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(await screen.findByText(/first name is required/i)).toBeVisible()
    expect(await screen.findByText(/last name is required/i)).toBeVisible()
    expect(await screen.findByText(/please enter a valid email/i)).toBeVisible()
    expect(await screen.findByText(/job title is required/i)).toBeVisible()

    expect(onSubmit).not.toHaveBeenCalled()
  })

  it('calls onSubmit with valid data when all fields are filled', async () => {
    const onSubmit = vi.fn()
    render(<EmployeeForm onSubmit={onSubmit} />)

    await userEvent.type(screen.getByPlaceholderText(/first name/i), 'John')
    await userEvent.type(screen.getByPlaceholderText(/last name/i), 'Doe')
    await userEvent.type(screen.getByPlaceholderText(/email/i), 'john.doe@example.com')
    await userEvent.type(screen.getByPlaceholderText(/job title/i), 'Developer')

    await userEvent.click(screen.getByRole('button', { name: /submit/i }))

    expect(onSubmit).toHaveBeenCalledTimes(1)

    // React hook-form by default calls onSubmit handler with 2 args: formData and the submit event
    // thus, we need only the form data [0]
    const [firstArg] = onSubmit.mock.calls[0]

    expect(firstArg).toEqual({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      jobTitle: 'Developer',
    })
  })
})
