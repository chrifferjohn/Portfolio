'use client'

import { FaGithub, FaLinkedin, FaTwitter, FaHeart, FaArrowUp } from 'react-icons/fa'
import { useState, useEffect } from 'react'

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null)
  useEffect(() => {
    setCurrentYear(new Date().getFullYear())
  }, [])

  const [showModal, setShowModal] = useState(false)
  const [feedback, setFeedback] = useState({ name: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const socialLinks = [
    { icon: <FaGithub size={24} />, link: 'https://github.com/chrifferjohn/', label: 'GitHub' },
    { icon: <FaLinkedin size={24} />, link: 'https://www.linkedin.com/in/chriffer-john-langomes', label: 'LinkedIn' },
    { icon: <FaTwitter size={24} />, link: 'https://x.com/jchriff', label: 'Twitter' }
  ]

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFeedback({ ...feedback, [e.target.name]: e.target.value })
  }

  const handleFeedbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: feedback.name,
          message: feedback.message
        })
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSuccess('Thank you for your feedback!')
        setFeedback({ name: '', message: '' })
      } else {
        setError(data.error || 'Failed to send feedback.')
      }
    } catch (err) {
      setError('Failed to send feedback.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Background decoration removed for black and white theme */}
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Main Footer Content removed as requested */}
        {/* Bottom Section */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-gray-200">
                © {currentYear ? currentYear : ''} Chriffer John Langomes. All rights reserved.
              </p>
              <p className="text-gray-400 text-sm mt-2">
                Made with <FaHeart className="inline text-white mx-1" size={14} /> using Next.js & React
              </p>
            </div>
            {/* Feedback Button */}
            <a
              href="/admin/feedback"
              className="text-white font-semibold transition-all duration-300 hover:underline hover:text-blue-400 bg-transparent border-none shadow-none px-0 py-0 rounded-none cursor-pointer"
            >
              Feedback
            </a>
            {/* Social Links */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              {socialLinks.map((social, idx) => (
                <a
                  key={social.label}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-white hover:text-blue-400 transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="group bg-white text-black p-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-110 border border-black"
              aria-label="Back to top"
            >
              <FaArrowUp className="group-hover:-translate-y-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 