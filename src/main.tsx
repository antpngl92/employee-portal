import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router'
import { EmployeesProvider } from './context/employee'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <EmployeesProvider>
      <App />
    </EmployeesProvider>
    </BrowserRouter>
  </StrictMode>,
)
