'use client'

import { useState, useEffect } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaTwitter, FaPaperPlane } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  // Auto-clear success message after 5 seconds
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('')
      }, 5000) // Clear after 5 seconds
      
      return () => clearTimeout(timer)
    }
  }, [success])

  // Auto-clear error message after 7 seconds
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('')
      }, 7000) // Clear after 7 seconds
      
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    // Clear messages when user starts typing
    if (success) setSuccess('')
    if (error) setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess('')
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setSuccess('Message sent successfully!')
        setFormData({ name: '', email: '', subject: '', message: '' })
        
        // Optional: Scroll to top of form to show success message
        const formElement = document.getElementById('contact-form')
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      } else {
        setError(data.error || 'Failed to send message.')
      }
    } catch (err) {
      setError('Failed to send message.')
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: <FaEnvelope size={24} className="text-white" />,
      title: 'Email',
      value: 'langomezchriff795@gmail.com',
      link: 'mailto:langomezchriff795@gmail.com',
    },
    {
      icon: <FaPhone size={24} className="text-white" />,
      title: 'Phone',
      value: '+63 912 345 6789',
      link: 'tel:+639123456789',
    },
    {
      icon: <FaMapMarkerAlt size={24} className="text-white" />,
      title: 'Location',
      value: 'Dagohoy, Guipos Zamboanga Del sur',
      link: '#',
    }
  ]

  // Use only static social links
  const socialLinks = [
    { icon: <FaGithub size={24} className="text-white" />, link: 'https://github.com/chrifferjohn/', label: 'GitHub' },
    { icon: <FaLinkedin size={24} className="text-white" />, link: 'https://www.linkedin.com/in/chriffer-john-langomes', label: 'LinkedIn' },
    { icon: <FaTwitter size={24} className="text-white" />, link: 'https://x.com/jchriff', label: 'Twitter' }
  ]

  return (
    <section id="contact" className="py-24 bg-white dark:bg-black relative">
      {/* Monochrome background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-gray-200 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-gray-300 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 slide-up">
          <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-6">
            Get In <span>Touch</span>
          </h2>
          <div className="w-32 h-1.5 bg-gray-800 dark:bg-gray-200 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-800 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Ready to start your next project? Let's discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          {/* Contact Form */}
          <div className="space-y-8 slide-up lg:order-1 order-1">
            <div id="contact-form" className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700">
              <h3 className="text-3xl font-bold text-black dark:text-white mb-8">Send Message</h3>
              
              {/* Success Message Card with Auto-hide Animation */}
              {success && (
                <div className="mb-6 p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl animate-fade-in">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                      <FaPaperPlane className="text-white text-lg" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-green-800 dark:text-green-200 font-bold text-lg">Message Sent Successfully!</h4>
                      <p className="text-green-700 dark:text-green-300 mt-1">Thank you for reaching out. I'll get back to you soon!</p>
                      <div className="mt-2 text-sm text-green-600 dark:text-green-400">
                        This message will disappear in a few seconds...
                      </div>
                    </div>
                    <button
                      onClick={() => setSuccess('')}
                      className="text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-200 text-xl font-bold"
                      aria-label="Close success message"
                    >
                      ×
                    </button>
                  </div>
                  {/* Progress bar showing auto-hide countdown */}
                  <div className="mt-4 w-full bg-green-200 dark:bg-green-800 rounded-full h-1">
                    <div className="bg-green-500 h-1 rounded-full animate-shrink-width" style={{animationDuration: '5s'}}></div>
                  </div>
                </div>
              )}

              {/* Error Message Card with Auto-hide Animation */}
              {error && (
                <div className="mb-6 p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl animate-fade-in">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                      <FaEnvelope className="text-white text-lg" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-red-800 dark:text-red-200 font-bold text-lg">Message Failed</h4>
                      <p className="text-red-700 dark:text-red-300 mt-1">{error}</p>
                      <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                        This message will disappear in a few seconds...
                      </div>
                    </div>
                    <button
                      onClick={() => setError('')}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 text-xl font-bold"
                      aria-label="Close error message"
                    >
                      ×
                    </button>
                  </div>
                  {/* Progress bar showing auto-hide countdown */}
                  <div className="mt-4 w-full bg-red-200 dark:bg-red-800 rounded-full h-1">
                    <div className="bg-red-500 h-1 rounded-full animate-shrink-width" style={{animationDuration: '7s'}}></div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-black dark:text-white font-semibold mb-3 text-lg">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black dark:text-white text-lg transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-black dark:text-white font-semibold mb-3 text-lg">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black dark:text-white text-lg transition-all duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-black dark:text-white font-semibold mb-3 text-lg">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black dark:text-white text-lg transition-all duration-300"
                    placeholder="What's this about?"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-black dark:text-white font-semibold mb-3 text-lg">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-gray-500 focus:border-transparent text-black dark:text-white text-lg transition-all duration-300 resize-none"
                    placeholder="Tell me about your project or inquiry..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-800 dark:bg-gray-200 text-white dark:text-black py-4 px-8 rounded-xl font-bold text-lg hover:bg-black dark:hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info Card */}
          <div className="space-y-8 slide-up lg:order-2 order-2">
            {/* Contact Info Cards */}
            <div>
              <h3 className="text-3xl font-bold text-black dark:text-white mb-8">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info) => (
                  <div key={info.title} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center space-x-6">
                      <div className="w-16 h-16 bg-gray-800 dark:bg-gray-200 rounded-2xl flex items-center justify-center shadow-lg">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-black dark:text-white text-lg mb-1">{info.title}</h4>
                        <a 
                          href={info.link}
                          className="text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors duration-300 text-lg"
                        >
                          {info.value}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 className="text-3xl font-bold text-black dark:text-white mb-8">Follow Me</h3>
              <div className="flex space-x-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.link}
                    className="w-16 h-16 bg-gray-800 dark:bg-gray-200 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl"
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Availability Card */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-200 dark:border-gray-700">
              <h4 className="text-2xl font-bold text-black dark:text-white mb-6">Let's Work Together</h4>
              <p className="text-gray-800 dark:text-gray-200 mb-6 text-lg leading-relaxed">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-full mr-4"></div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">Available for freelance work</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-full mr-4"></div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">Open to full-time opportunities</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-gray-800 dark:bg-gray-200 rounded-full mr-4"></div>
                  <span className="text-gray-800 dark:text-gray-200 font-medium">Remote collaboration ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact