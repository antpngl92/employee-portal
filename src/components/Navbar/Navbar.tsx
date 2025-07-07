import { Link } from 'react-router'
import { useState, useEffect } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            <span>Employee Portal</span>
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
            Home
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar