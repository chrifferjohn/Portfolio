'use client'

import { useState, useEffect } from 'react'
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

// Helper for default new testimonial
const defaultNewTestimonial = {
  name: '',
  position: '',
  content: '',
  rating: 5,
  image: '👤',
}

const LOCAL_STORAGE_KEY = 'testimonials';

const Testimonials = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoSliding, setIsAutoSliding] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [newTestimonial, setNewTestimonial] = useState({ ...defaultNewTestimonial })
  const [isMounted, setIsMounted] = useState(false)
  
  const defaultTestimonials = [
    {
      name: 'Terhevic Bation',
      position: 'Assistant Librarian',
      content: 'Chriffer is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills made our project a success. I would gladly work with him again.',
      rating: 5,
      image: '👨‍💼'
    },
    {
      name: 'Mercelyn Timbong',
      position: 'Student client',
      content: 'maayo ni siya na developer iya gihimo na sytem kay Kuan kanang user-friendly interface,making it easy to navigate.',
      rating: 5,
      image: '👩‍🎓'
    },
    {
      name: 'Jenelyn Gella',
      position: 'SK Chairman',
      content: 'Chriffer did an outstanding job developing the Barangay Dagohoy Information System. His expertise made our record-keeping and document processing more efficient, saving us time and improving our services to the community.',
      rating: 5,
      image: '👩‍💼'
    },
    {
      name: 'arf leffer Halios',
      position: 'Student',
      content: 'Chriffer developed an amazing system that is very user-friendly and efficient. Navigating through the platform is smooth, making it easier for students like me to access the information we need quickly.',
      rating: 5,
      image: '👨‍🎓'
    },
    {
      name: 'Virgie J. Lantig',
      position: 'Bucofac Manager',
      content: "The system looks simple and clean, which makes it easy to use. It has fewer buttons and a smooth login process, so users don't get confused or overwhelmed. Everything is quick to find and easy to click, which saves time and makes users happier. It's a great example of how simple design can still work really well.",
      rating: 5,
      image: '👩‍💼'
    },
  ];
  const [testimonialList, setTestimonialList] = useState(defaultTestimonials);

  // Mount check and localStorage loading
  useEffect(() => {
    setIsMounted(true)
    // Load from localStorage only after mounting
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (stored) {
      try {
        setTestimonialList(JSON.parse(stored))
      } catch (error) {
        console.error('Error parsing stored testimonials:', error)
        // Fall back to default testimonials if parsing fails
        setTestimonialList(defaultTestimonials)
      }
    }
  }, [])

  // Save to localStorage whenever testimonialList changes (but only after mounting)
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(testimonialList))
    }
  }, [testimonialList, isMounted])

  // Auto-slide functionality
  useEffect(() => {
    if (isAutoSliding) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % testimonialList.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isAutoSliding, testimonialList.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoSliding(false)
    setTimeout(() => setIsAutoSliding(true), 5000) // Resume auto-slide after 5 seconds
  }

  const goToPrevious = () => {
    setCurrentSlide((prev: number) => (prev - 1 + testimonialList.length) % testimonialList.length)
    setIsAutoSliding(false)
    setTimeout(() => setIsAutoSliding(true), 5000)
  }

  const goToNext = () => {
    setCurrentSlide((prev: number) => (prev + 1) % testimonialList.length)
    setIsAutoSliding(false)
    setTimeout(() => setIsAutoSliding(true), 5000)
  }

  // Handle modal form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewTestimonial((prev) => ({ ...prev, [name]: value }))
  }

  // Handle rating change
  const handleRatingChange = (rating: number) => {
    setNewTestimonial((prev) => ({ ...prev, rating }))
  }

  // Handle submit
  const handleAddTestimonial = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTestimonial.name || !newTestimonial.position || !newTestimonial.content) return
    // Assign icon based on name/position
    let icon = '👤';
    const nameLower = newTestimonial.name.toLowerCase();
    const posLower = newTestimonial.position.toLowerCase();
    if (posLower.includes('student')) {
      if (nameLower.includes('jen') || nameLower.includes('merc') || nameLower.includes('virg') || nameLower.includes('lyn')) {
        icon = '👩‍🎓';
      } else {
        icon = '👨‍🎓'; // Corrected emoji for male student
      }
    } else if (posLower.includes('librarian') || posLower.includes('manager') || posLower.includes('chairman')) {
      if (nameLower.includes('jen') || nameLower.includes('merc') || nameLower.includes('virg') || nameLower.includes('lyn')) {
        icon = '👩‍💼';
      } else {
        icon = '👨‍💼';
      }
    }
    const testimonialWithIcon = { ...newTestimonial, image: icon };
    setTestimonialList((prev) => [...prev, testimonialWithIcon]);
    setShowModal(false);
    setNewTestimonial({ ...defaultNewTestimonial });
    setCurrentSlide(testimonialList.length); // Go to new testimonial
  }

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-black relative">
      {/* Monochrome background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-20 w-64 h-64 bg-gray-200 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-20 w-64 h-64 bg-gray-300 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 slide-up">
          <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-6">
            Client Testimonials
          </h2>
          <div className="w-32 h-1.5 bg-gray-800 dark:bg-gray-200 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-800 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Here's what people are saying about my work and collaboration experience.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-7xl mx-auto mb-16">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out gap-6"
              style={{ transform: `translateX(-${currentSlide * 33.33}%)` }}
            >
              {testimonialList.map((testimonial: any, index: number) => (
                <div 
                  key={index}
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0"
                >
                  <div className="modern-card bg-white dark:bg-gray-800 p-8 rounded-3xl hover-lift h-full">
                    {/* Quote Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 bg-gray-800 dark:bg-gray-200 rounded-2xl flex items-center justify-center text-white shadow-lg">
                        <FaQuoteLeft size={18} className="text-black dark:text-gray-900" />
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} size={16} className={i < testimonial.rating ? 'text-yellow-400' : 'text-gray-400'} />
                      ))}
                    </div>

                    {/* Content */}
                    <p className="text-gray-800 dark:text-gray-200 mb-6 leading-relaxed text-base text-center">
                      "{testimonial.content}"
                    </p>

                    {/* Author */}
                    <div className="flex items-center justify-center mt-auto">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-full flex items-center justify-center mr-3 shadow-lg overflow-hidden text-2xl text-black dark:text-white">
                        {testimonial.image}
                      </div>
                      <div className="text-center">
                        <h4 className="font-bold text-black dark:text-white text-lg">{testimonial.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400 font-medium text-sm">{testimonial.position}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-purple-600 hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <FaChevronLeft size={18} color="black" />
          </button>
          
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-purple-600 hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <FaChevronRight size={18} color="black" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center space-x-3 mb-16">
          {testimonialList.map((_: any, index: number) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Auto-slide indicator */}
        <div className="text-center mb-16 flex justify-center items-center gap-4">
          <button
            onClick={() => setIsAutoSliding(!isAutoSliding)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isAutoSliding
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {isAutoSliding ? 'Auto-slide ON' : 'Auto-slide OFF'}
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-blue-600 text-white hover:bg-blue-700"
          >
            Add Testimonial
          </button>
        </div>

        {/* Add Testimonial Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-xl relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">Add Testimonial</h3>
              <form onSubmit={handleAddTestimonial} className="space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newTestimonial.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 mb-1">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={newTestimonial.position}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 mb-1">Testimonial</label>
                  <textarea
                    name="content"
                    value={newTestimonial.content}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-black dark:text-white"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-200 mb-1">Rating</label>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => handleRatingChange(star)}
                        className={star <= newTestimonial.rating ? 'text-yellow-400' : 'text-gray-400'}
                      >
                        <FaStar />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-400 dark:hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 font-semibold"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-4xl font-bold text-black dark:text-white mb-2">100%</div>
            <div className="text-gray-800 dark:text-gray-200 font-medium">Client Satisfaction</div>
          </div>
          <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-4xl font-bold text-black dark:text-white mb-2">50+</div>
            <div className="text-gray-800 dark:text-gray-200 font-medium">Projects Completed</div>
          </div>
          <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-4xl font-bold text-black dark:text-white mb-2">30+</div>
            <div className="text-gray-800 dark:text-gray-200 font-medium">Happy Clients</div>
          </div>
          <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
            <div className="text-4xl font-bold text-black dark:text-white mb-2">5.0</div>
            <div className="text-gray-800 dark:text-gray-200 font-medium">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials 