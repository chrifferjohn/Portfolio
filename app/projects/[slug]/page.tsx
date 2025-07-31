"use client"

import { useParams, useRouter } from 'next/navigation'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'
import { useEffect, useState } from 'react'

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  github?: string;
  live?: string;
  category?: string;
  year?: string;
  gradient?: string;
}

const staticProjects: Project[] = [
  {
    title: 'Library Books QR Code Scanner',
    description: 'A web-based system that streamlines book borrowing and returning using QR code scanning. Features include real-time book tracking, user authentication, and borrowing history management.',
    image: '/library-books-qr-code-scanner.png',
    technologies: ['HTML', 'Tailwind CSS', 'Laravel', 'PHP', 'JavaScript'],
    github: '#',
    live: '#',
    category: 'Full Stack',
  },
  {
    title: 'Rice Mill Scheduling System',
    description: 'A scheduling system designed for rice mills to automate appointment booking and track milling sessions. It ensures efficient resource allocation and production tracking.',
    image: '/rice.jpg',
    technologies: ['PHP', 'Tailwind CSS', 'JavaScript', 'MySQL', 'AJAX'],
    github: '#',
    live: '#',
    category: 'Web App',
  },
  {
    title: 'Barangay Dagohoy Information System',
    description: 'A web-based system that digitizes barangay records, enabling efficient document requests, resident data management, and service tracking.',
    image: '/barangay.jpg',
    technologies: ['Bootstrap 5', 'HTML', 'PHP', 'JavaScript', 'MySQL'],
    github: '#',
    live: '#',
    category: 'Full Stack',
  },
  {
    title: 'Photo Geotagging Incident Response System',
    description: 'A community safety platform that allows citizens to report incidents with geotagged photos. The system helps local authorities respond quickly to safety concerns and track incident patterns.',
    image: '/PGGRS.jpg',
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'PHP', 'MySQL', 'AJAX'],
    github: '#',
    live: '#',
    category: 'Web App',
  },
  {
    title: 'Children Nutritional Status Monitoring System',
    description: "A comprehensive system for tracking and monitoring children's nutritional health in Lapuyan. Features include growth tracking, nutritional assessment, and intervention management.",
    image: '/chc.jpg',
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript', 'PHP', 'MySQL', 'AJAX'],
    github: '#',
    live: '#',
    category: 'Health System',
  },
  {
    title: 'IT Career Roadmap App',
    description: 'A content management system that allows users to create, edit, and publish blog posts. Includes user authentication, category filtering, and a rich text editor.',
    image: '🛣️',
    technologies: ['React Native', 'Axios', 'Tailwind CSS', 'MySQL'],
    github: '#',
    live: '#',
    category: 'Mobile App',
  },
  {
    title: 'BSIT Promotional Website',
    description: 'An interactive website promoting the BSIT program. Showcases curriculum details, student projects, career opportunities, and faculty profiles.',
    image: '🎓',
    technologies: ['HTML', 'Bootstrap', 'JavaScript'],
    github: '#',
    live: '#',
    category: 'Frontend',
  },
  {
    title: 'Currency Converter',
    description: 'A web app that provides real-time currency conversion. It integrates with an exchange rate API to ensure accurate and up-to-date conversions.',
    image: '💱',
    technologies: ['React', 'JavaScript', 'Tailwind CSS'],
    github: '#',
    live: '#',
    category: 'Web App',
  },
]

const LOCAL_STORAGE_KEY = 'projects';
const slugify = (str: string) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

export default function ProjectDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const slug = params?.slug
  const [project, setProject] = useState<Project | null>(null)

  useEffect(() => {
    // Try to load from localStorage first
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (stored) {
        const localProjects: Project[] = JSON.parse(stored)
        const found = localProjects.find((p: Project) => slugify(p.title) === slug)
        if (found) {
          setProject(found)
          return
        }
      }
    }
    // Fallback to static
    const staticFound = staticProjects.find((p: Project) => slugify(p.title) === slug)
    if (staticFound) setProject(staticFound)
  }, [slug])

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black dark:text-white mb-4">Project Not Found</h1>
          <button onClick={() => router.push('/#projects')} className="mt-4 px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-black transition-all duration-300">Back to Projects</button>
        </div>
      </div>
    )
  }

  return (
    <section className="min-h-screen py-24 bg-white dark:bg-black relative">
      <div className="container mx-auto px-4">
        <button onClick={() => router.push('/#projects')} className="mb-8 px-6 py-3 bg-gray-800 text-white rounded-xl font-semibold hover:bg-black transition-all duration-300">Back to Projects</button>
        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center mb-8">
            {project && project.image && typeof project.image === 'string' && project.image.startsWith('/') ? (
              <img src={project.image} alt={project.title} className="w-full max-w-md h-64 object-cover rounded-2xl mb-6 border border-gray-200 dark:border-gray-700" />
            ) : project && project.image ? (
              <img src={project.image} alt={project.title} className="w-full max-w-md h-64 object-contain rounded-2xl mb-6 border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-900" />
            ) : (
              <div className="text-7xl mb-6">📁</div>
            )}
            <h1 className="text-3xl font-bold text-black dark:text-white mb-2 text-center">{project && project.title}</h1>
            {project && project.year && (
              <span className="inline-block text-sm font-semibold text-white bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full mb-4">{project.year}</span>
            )}
            {project && project.category && !project.year && (
              <span className="inline-block text-sm font-semibold text-white bg-black/20 backdrop-blur-sm px-3 py-1 rounded-full mb-4">{project.category}</span>
            )}
          </div>
          <p className="text-lg text-gray-800 dark:text-gray-200 mb-8 text-center">{project && project.description}</p>
          <div className="mb-8">
            <h2 className="text-xl font-bold text-black dark:text-white mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              {project && project.technologies && project.technologies.map((tech, idx) => (
                <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-8">
            {project && project.github && (
              <a href={project.github} className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all duration-300 font-semibold" target="_blank" rel="noopener noreferrer">
                <FaGithub size={20} /> Code
              </a>
            )}
            {project && project.live && (
              <a href={project.live} className="flex items-center gap-2 text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-all duration-300 font-semibold" target="_blank" rel="noopener noreferrer">
                <FaExternalLinkAlt size={18} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 