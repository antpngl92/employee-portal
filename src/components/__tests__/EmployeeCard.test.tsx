import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi, beforeEach } from 'vitest'

const mockNavigate = vi.fn()

vi.mock('react-router', () => ({
  ...vi.importActual('react-router'),
  useNavigate: () => mockNavigate,
}))

import EmployeeCard from '../EmployeeCard/EmployeeCard'

describe('EmployeeCard', () => {
  const props = {
    id: 42,
    firstName: 'Alice',
    lastName: 'Smith',
    jobTitle: 'Engineer',
    email: 'alice@example.com',
  }

  beforeEach(() => {
    mockNavigate.mockReset()
  })

  it('renders initials, name, jobTitle and email link', () => {
    render(<EmployeeCard {...props} />)

    expect(screen.getByText(`${props.firstName[0]}${props.lastName[0]}`)).toBeVisible()
    expect(screen.getByText(`${props.firstName} ${props.lastName}`)).toBeVisible()
    expect(screen.getByText(`${props.jobTitle}`)).toBeVisible()

    const link = screen.getByRole('link', { name: props.email })
    expect(link).toHaveAttribute('href', `mailto:${props.email}`)
  })

  it('navigates to detail page on View click', async () => {
    render(<EmployeeCard {...props} />)

    await userEvent.click(screen.getByRole('button', { name: /view/i }))

    expect(mockNavigate).toHaveBeenCalledOnce()
    expect(mockNavigate).toHaveBeenCalledWith(`/employee/${props.id}`)
  })
})