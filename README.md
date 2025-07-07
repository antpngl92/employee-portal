# Employee Portal

A simple employee management portal built with React, TypeScript, Tailwind CSS, and json-server. It demonstrates a clean architecture using React Context for state management, React Router for navigation, and Shadcn components for UI. Unit tests are written with Vitest and Testing Library.

## 🚀 Features

- **Home Page** (`/`)

  - Displays a list of employees fetched from a local json-server
  - Shows loading skeletons while data is loading
  - Filters employees by first or last name via a search input
  - Opens a modal to create a new employee

- **Employee Details Page** (`/employee/:id`)

  - View, edit, or delete an employee
  - Form validation with Zod and react-hook-form
  - Confirmation dialog before deletion

- **Global State**

  - `EmployeesContext` provides `employees`, `loading`, `error`, and CRUD methods across the app

- **Unit Tests**

  - Vitest + Testing Library for component and page tests
  - Coverage for form validation, context usage, and routing scenarios

## 📦 Tech Stack

- **Frameworks & Libraries**: React, TypeScript, Tailwind CSS, Shadcn/UI, React Router
- **Data & Networking**: json-server (REST API), Axios
- **Forms & Validation**: react-hook-form, Zod
- **Testing**: Vitest, @testing-library/react

## 🏁 Getting Started

### Prerequisites

- Node.js v16+ (or newer)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/antpngl92/employee-portal.git
   cd employee-portal
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the fake API server** Make sure you have `db.json` in the project root:

   ```json
   {
     "employee": [
       { "id": 1, "firstName": "Roxanne", "lastName": "Ernesto", ... }
     ]
   }
   ```

   Then run:

   ```bash
   npm run server
   ```

4. **Run the app**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.


## ℹ️ Notes

- **Context**: All CRUD operations (`list`, `create`, `update`, `delete`) and state are managed via `EmployeesContext` in `src/context/employee.tsx`.
- **Forms**: The form component (`EmployeeForm`) uses react-hook-form with Zod schema for validation.
- **UI**: Uses Shadcn components for a consistent look & feel.