'use client'

import { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Mount check to prevent hydration issues
  useEffect(() => {
    setIsMounted(true)
    // Load dark mode preference from localStorage after mounting
    const savedDarkMode = localStorage.getItem('darkMode')
    if (savedDarkMode) {
      setIsDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  useEffect(() => {
    if (!isMounted) return // Don't run until mounted
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMounted])

  // Dark mode effect
  useEffect(() => {
    if (!isMounted) return // Don't run until mounted
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    // Save to localStorage
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode))
  }, [isDarkMode, isMounted])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white dark:bg-black shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-center h-16">
          <div className="text-2xl font-bold text-black dark:text-white">
            Portfolio
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 px-2 py-1 rounded"
              >
                {item.name}
              </button>
            ))}
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white dark:bg-black text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </div>
          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Dark Mode Toggle for Mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-white dark:bg-black text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black dark:text-white p-2"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-black shadow-lg rounded-b-xl py-4 px-6 absolute top-16 left-0 w-full z-40 flex flex-col space-y-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 px-2 py-1 rounded text-left"
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar 