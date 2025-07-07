import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Employee } from '@/types/employee'
import { Home } from '@/pages'
import userEvent from '@testing-library/user-event'

let mockContext = {
  employees: [] as Employee[],
  loading: true,
  error: null as string | null,
  select: vi.fn(),
  refresh: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  remove: vi.fn(),
  employeeMap: {} as Record<number, Employee>
}

vi.mock('@/context/employee', () => ({
  useEmployeesContext: () => mockContext
}))

beforeEach(() => {
  mockContext = {
    employees: [],
    loading: true,
    error: null,
    select: vi.fn(),
    refresh: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
    employeeMap: {}
  }
  vi.clearAllMocks()
})

describe('Home page', () => {
  it('renders three EmployeeCardSkeletons when loading', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    const skeletons = screen.getAllByTestId('employee-card-skeleton')
    expect(skeletons).toHaveLength(3)
    expect(screen.queryByTestId('employee-card')).toBeNull()
  })

  it('renders error message when error is present', () => {
    const errorMessage = 'Oops!'
    mockContext.error = errorMessage
    mockContext.loading = false

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByText(errorMessage)).toBeVisible()
    expect(screen.queryByTestId('employee-card-skeleton')).toBeNull()
    expect(screen.queryByTestId('employee-card')).toBeNull()
  })

  it('renders filtered EmployeesList when data is present and filter is applied', async () => {
    mockContext.employees = [
      { id: 1, firstName: 'Alice', lastName: 'Smith', email: 'a@x.com', jobTitle: 'Dev' },
      { id: 2, firstName: 'Bob', lastName: 'Brown', email: 'b@x.com', jobTitle: 'QA' },
    ];
    mockContext.loading = false;
    mockContext.error = null;

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId('employee-card')).toHaveLength(2);

    const filterInput = screen.getByPlaceholderText(/search by name/i);
    await userEvent.type(filterInput, 'bob');

    const cardsAfterFilter = screen.getAllByTestId('employee-card');
    expect(cardsAfterFilter).toHaveLength(1);
    expect(cardsAfterFilter[0]).toHaveTextContent('Bob Brown');
  });
})