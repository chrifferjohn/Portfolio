'use client'

import { useState } from 'react'
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { useEffect } from 'react'
import Link from 'next/link'

const LOCAL_STORAGE_KEY = 'projects';

const Projects = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 6
  const [isMounted, setIsMounted] = useState(false)

  // Modal state for adding project
  const [showModal, setShowModal] = useState(false)
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: '',
    image: '',
    category: '',
    github: '',
  })
  const initialProjects = [
    {
      title: 'Library Books QR Code Scanner',
      description: 'A web-based system that streamlines book borrowing and returning using QR code scanning. Features include real-time book tracking, user authentication, and borrowing history management.',
      image: '/library-books-qr-code-scanner.png',
      technologies: ['HTML', 'Tailwind CSS', 'Laravel', 'PHP', 'JavaScript'],
      github: '#',
      category: 'Full Stack',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Rice Mill Scheduling System',
      description: 'A scheduling system designed for rice mills to automate appointment booking and track milling sessions. It ensures efficient resource allocation and production tracking.',
      image: '/rice.jpg',
      technologies: ['PHP', 'Tailwind CSS', 'JavaScript', 'MySQL', 'AJAX'],
      github: '#',
      category: 'Web App',
      gradient: 'from-green-500 to-blue-500'
    },
    {
      title: 'Barangay Dagohoy Information System',
      description: 'A web-based system that digitizes barangay records, enabling efficient document requests, resident data management, and service tracking.',
      image: '/barangay.jpg',
      technologies: ['Bootstrap 5', 'HTML', 'PHP', 'JavaScript', 'MySQL'],
      github: '#',
      category: 'Full Stack',
      gradient: 'from-pink-500 to-red-500'
    },
    {
      title: 'Photo Geotagging Incident Response System',
      description: 'A comprehensive incident reporting system with photo geotagging capabilities. Features include real-time location tracking, incident categorization, and automated report generation.',
      image: '/PGGRS.jpg',
      technologies: ['PHP', 'Bootstrap', 'JavaScript', 'MySQL', 'Google Maps API'],
      github: '#',
      category: 'Full Stack',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Community Health Center System',
      description: 'A patient management system for community health centers. Includes appointment scheduling, medical records management, and inventory tracking for medical supplies.',
      image: '/chc.jpg',
      technologies: ['Laravel', 'Vue.js', 'Tailwind CSS', 'MySQL', 'Chart.js'],
      github: '#',
      category: 'Healthcare',
      gradient: 'from-teal-500 to-green-500'
    },
    {
      title: 'Portfolio Website',
      description: 'A modern, responsive portfolio website built with Next.js and Tailwind CSS. Features include project showcase, contact form, testimonials, and dark mode support.',
      image: '/portfolio.png',
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Framer Motion'],
      github: '#',
      category: 'Frontend',
      gradient: 'from-purple-500 to-indigo-500'
    }
  ];
  const [projectList, setProjectList] = useState(initialProjects);

  // Mount check and localStorage loading
  useEffect(() => {
    setIsMounted(true)
    // Load from localStorage only after mounting
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (stored) {
      try {
        setProjectList(JSON.parse(stored))
      } catch (error) {
        console.error('Error parsing stored projects:', error)
        // Fall back to initial projects if parsing fails
        setProjectList(initialProjects)
      }
    }
  }, [])

  // Save to localStorage whenever projectList changes (but only after mounting)
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(projectList))
    }
  }, [projectList, isMounted])

  // Helper to create slug from title
  const slugify = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

  // Pagination logic
  const totalPages = Math.ceil(projectList.length / projectsPerPage)
  const startIndex = (currentPage - 1) * projectsPerPage
  const endIndex = startIndex + projectsPerPage
  const currentProjects = projectList.slice(startIndex, endIndex)

  const goToPrevious = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1))
  }

  const goToNext = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages))
  }

  const goToPage = (page: number) => {
    setCurrentPage(page)
  }

  // Handle modal form changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewProject((prev: any) => ({ ...prev, [name]: value }))
  }

  // Handle add project submit
  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newProject.title || !newProject.description) return
    setProjectList((prev) => [
      {
        title: newProject.title,
        description: newProject.description,
        image: newProject.image || '💻',
        technologies: newProject.technologies.split(',').map(t => t.trim()).filter(Boolean),
        github: '#',
        category: newProject.category || 'Other',
        gradient: 'from-gray-500 to-gray-700',
      },
      ...prev,
    ])
    setShowModal(false)
    setNewProject({ title: '', description: '', technologies: '', image: '', category: '', github: '' })
    setCurrentPage(1)
  }

  return (
    <section id="projects" className="py-24 bg-white dark:bg-black relative">
      {/* Monochrome background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 right-20 w-64 h-64 bg-gray-200 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-20 w-64 h-64 bg-gray-300 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 slide-up">
          <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-6">
            My Projects
          </h2>
          <div className="w-32 h-1.5 bg-gray-800 dark:bg-gray-200 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-800 dark:text-gray-200 max-w-4xl mx-auto leading-relaxed">
            Here are some of the projects I've worked on, showcasing my skills and creativity in various technologies and domains.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto">
          {currentProjects.map((project: any, index: number) => (
            <Link
              key={index}
              href={`/projects/${slugify(project.title)}`}
              className="group bg-white dark:bg-gray-800 rounded-2xl hover-lift relative overflow-hidden border border-gray-200 dark:border-gray-700 block transition-transform duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-32 md:h-36 overflow-hidden rounded-t-2xl">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* View Button on hover */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-semibold rounded-lg shadow-lg cursor-pointer">View</span>
                  </span>
                </div>
              </div>
              <div className="relative p-3 md:p-4">
                <h3 className="text-sm md:text-base font-bold text-black dark:text-white text-center leading-tight mb-2">
                  {project.title}
                </h3>
                {/* Tech stack under project title */}
                <div className="flex flex-wrap justify-center gap-1">
                                      {project.technologies.slice(0, 3).map((tech: string, idx: number) => (
                    <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded font-normal">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">+{project.technologies.length - 3}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination with Add Project Link */}
        <div className="flex flex-wrap justify-center items-center mt-16 space-x-2">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              currentPage === 1
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transform hover:scale-105'
            }`}
          >
            <FaChevronLeft size={14} />
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex space-x-2 mx-4">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`w-10 h-10 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
              currentPage === totalPages
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 transform hover:scale-105'
            }`}
          >
            Next
            <FaChevronRight size={14} />
          </button>
          {/* Add Project Link */}
          <Link
            href="/projects/add"
            className="ml-4 mt-4 md:mt-0 text-black dark:text-white font-semibold transition-all duration-300 hover:underline bg-transparent border-none shadow-none px-0 py-0 rounded-none cursor-pointer"
          >
            Add Project
          </Link>
        </div>

        {/* Project Stats */}
        <div className="text-center mt-12 fade-in">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Showing {startIndex + 1}-{Math.min(endIndex, projectList.length)} of {projectList.length} projects
          </p>
        </div>
      </div>
    </section>
  )
}

export default Projects 