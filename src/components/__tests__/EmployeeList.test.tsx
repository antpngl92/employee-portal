import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { EmployeeList } from '@/components'
import { MemoryRouter } from 'react-router'

describe('EmployeesList', () => {
  it('renders no EmployeeCard when employees=[]', () => {
    render(<EmployeeList employees={[]} />)

    expect(screen.queryByTestId('employee-card')).toBeNull()
  })

  it('renders one card per employee in props', () => {
    const employees = [
      { id: 1, firstName: 'Alice', lastName: 'Smith', email: 'a@x.com', jobTitle: 'Eng' },
      { id: 2, firstName: 'Bob', lastName: 'Jones', email: 'b@x.com', jobTitle: 'QA' },
    ]

    render(
      <MemoryRouter>
        <EmployeeList employees={employees} />
      </MemoryRouter>
    )

    const cards = screen.getAllByTestId('employee-card')
    expect(cards).toHaveLength(employees.length)

    expect(cards[0]).toHaveTextContent(`${employees[0].firstName} ${employees[0].lastName}`)
    expect(cards[1]).toHaveTextContent(`${employees[1].firstName} ${employees[1].lastName}`)
  })
})
