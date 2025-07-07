import { Route, Routes } from "react-router"
import { Navbar, Toaster } from "./components"
import { EmployeeDetails, Home } from "./pages"

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>
      </main>
      <Toaster position="top-right" />
    </div>
  )
}

export default App
