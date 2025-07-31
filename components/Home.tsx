'use client'

import { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaTwitter, FaArrowDown, FaPaperPlane, FaMapMarkerAlt } from 'react-icons/fa'
import Contact from './Contact'
import About from './About'
import Experience from './Experience'
import Skills from './Skills'

const TYPING_TEXT = 'Junior Software Developer'
const TYPING_SPEED = 100 // ms per character
const PAUSE_DURATION = 2000 // ms to pause before restarting

// Extract profile/header and navbar into a new component
export type ProfileHeaderProps = { onSectionChange: (section: string | null) => void }
const ProfileHeader = ({ onSectionChange }: ProfileHeaderProps) => {
  const [typed, setTyped] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Ensure component is mounted before starting animation
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return // Don't start animation until mounted
    
    let timeout: NodeJS.Timeout
    const typeWriter = () => {
      const currentLength = typed.length
      if (!isDeleting) {
        if (currentLength < TYPING_TEXT.length) {
          setTyped(TYPING_TEXT.slice(0, currentLength + 1))
          timeout = setTimeout(typeWriter, TYPING_SPEED)
        } else {
          timeout = setTimeout(() => setIsDeleting(true), PAUSE_DURATION)
        }
      } else {
        if (currentLength > 0) {
          setTyped(TYPING_TEXT.slice(0, currentLength - 1))
          timeout = setTimeout(typeWriter, TYPING_SPEED / 2)
        } else {
          setIsDeleting(false)
          timeout = setTimeout(typeWriter, TYPING_SPEED)
        }
      }
    }
    timeout = setTimeout(typeWriter, TYPING_SPEED)
    return () => clearTimeout(timeout)
  }, [typed, isDeleting, isMounted])

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

  return (
    <div className="w-full bg-transparent pt-24 relative z-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-center max-w-4xl mx-auto gap-12 mt-8">
          {/* Profile Image Left */}
          <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto mb-6 md:mb-0">
            <img 
              src="/profilez.png" 
              alt="Chriffer John Langomes - Full Stack Developer" 
              className="w-48 h-48 md:w-64 md:h-64 rounded-3xl object-cover transition-transform duration-300 hover:scale-105 shadow-lg border border-gray-300 dark:border-gray-700 cursor-pointer"
              onClick={() => setShowDetails(!showDetails)}
            />
          </div>
          {/* Name, Title, Buttons, Details Right */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-2 leading-none">
              Chriffer John Langomes
            </h1>
            <h2 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-200 mb-2 font-medium flex items-center md:justify-start justify-center gap-2">
              <span>{typed}</span>
              <span className="inline-block w-1 h-8 bg-gray-800 dark:bg-gray-200 align-middle animate-pulse ml-2"></span>
            </h2>
            {/* Location below Full Stack Developer */}
            <div className="flex items-center md:justify-start justify-center gap-2 text-gray-700 dark:text-gray-300 mb-4">
              <FaMapMarkerAlt className="text-red-500" />
              <span>Dagohoy, Guipos Zamboanga Del sur</span>
            </div>
            {/* Details (hidden by default) */}
            {showDetails && (
              <div className="space-y-6 md:text-left text-center">
                <p className="text-lg text-gray-800 dark:text-gray-200 max-w-2xl md:mx-0 mx-auto leading-relaxed font-light">
                  A freelance developer building <span className="font-semibold text-black dark:text-white">web-based digital solutions</span> focused on functionality, usability, and accessibility — specializing in <span className="font-semibold text-black dark:text-white">PHP, MySQL, JavaScript, Tailwind, Next.js, and React Native</span>.
                </p>
              </div>
            )}
            {/* Download Resume and Send Message Buttons - always visible */}
            <div className="flex flex-col sm:flex-row md:justify-start justify-center items-center gap-4 mt-6">
              <a
                href="/Chrifferjohn_Langomes_resume.pdf"
                className="px-6 py-2 bg-white dark:bg-black border-2 border-black dark:border-white text-black dark:text-white rounded-xl font-semibold hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-300"
                download
              >
                Download Resume
              </a>
              <button
                onClick={(e) => {
                  e.preventDefault(); // Prevent any default behavior
                  e.stopPropagation(); // Stop event bubbling
                  
                  console.log('Send Message button clicked'); // Debug log
                  
                  // Wait a bit for the page to be fully loaded
                  setTimeout(() => {
                    const el = document.getElementById('contact');
                    console.log('Contact element found:', el); // Debug log
                    
                    if (el) {
                      el.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start',
                        inline: 'nearest'
                      });
                    } else {
                      // Fallback: try to find contact section by other selectors
                      const contactSection = document.querySelector('section[id="contact"]');
                      console.log('Fallback contact section found:', contactSection); // Debug log
                      
                      if (contactSection) {
                        contactSection.scrollIntoView({ 
                          behavior: 'smooth',
                          block: 'start',
                          inline: 'nearest'
                        });
                      } else {
                        console.error('Contact section not found anywhere on the page');
                        // Last resort: scroll to bottom of page
                        window.scrollTo({
                          top: document.body.scrollHeight,
                          behavior: 'smooth'
                        });
                      }
                    }
                  }, 100); // Small delay to ensure DOM is ready
                }}
                className="px-6 py-2 bg-gray-800 text-white rounded-xl font-semibold hover:bg-black transition-all duration-300 inline-flex items-center gap-2"
              >
                <FaPaperPlane className="text-sm" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Home now only renders the Home section content (not the profile/header or nav)
const Home = ({ onSectionChange }: { onSectionChange?: (section: string | null) => void }) => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black relative overflow-hidden">
      {/* Gray animated background elements */}
      <div className="absolute top-20 left-10 w-80 h-80 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse float-animation"></div>
      <div className="absolute top-40 right-10 w-80 h-80 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-pulse float-animation" style={{animationDelay: '2s'}}></div>
      <div className="absolute -bottom-8 left-20 w-80 h-80 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-full mix-blend-multiply filter blur-2xl opacity-45 animate-pulse float-animation" style={{animationDelay: '4s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse float-animation" style={{animationDelay: '1s'}}></div>
      {/* Home section content: ProfileHeader */}
      <div className="w-full">
        <ProfileHeader onSectionChange={onSectionChange || (() => {})} />
      </div>
    </section>
  )
}

export { ProfileHeader }
export default Home 