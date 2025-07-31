'use client'

import { useState } from 'react'

type Certification = {
  name: string;
  issuer: string;
  year: string;
  image?: string; // Added image property
};

const Experience = () => {
  const experience = [
    {
      title: 'IT Intern',
      company: 'JHCSC Library',
      period: 'February 2025 - June 2025',
      description: '',
      achievements: [
        'Developed a QR code scanning system to streamline book tracking and borrowing processes',
        'Integrated QR code generation and scanning using JavaScript and PHP',
        'Implemented a MySQL database to store book details, borrower information, and transaction history',
        'Designed and developed a Library Inventory System for efficient book cataloging and stock management',
        'Automated book check-in/check-out processes, reducing manual work by 50%',
        'Conducted system testing, debugging, and performance optimization for smooth operation',
        'Provided training to library staff on using both the QR code scanner and inventory system',
      ]
    }
  ]

  const education = [
    {
      degree: 'Bachelor of Science in Information Technology',
      school: 'Josefina Herrera Cerelles State College',
      period: '2022 - 2025',
      description: 'Specialized in Web and Mobile Development, Database Management, and System Analysis. Worked on various projects involving PHP, React Native, and MySQL.',
      gpa: ''
    }
  ]

  const certifications: Certification[] = [
    {
      name: 'Javascript Certificate',
      issuer: 'freecodecamp',
      year: '2023'
    },
    {
      name: 'CERTIFICATE OF ATTENDANCE_ICT Learning and Certification Summit',
      issuer: 'ILCDB EPMD',
      year: '2023'
    },
    {
      name: 'Koha ILS Certification',
      issuer: 'Koha',
      year: '2025'
    },
    // New certifications with images
    {
      name: 'Python for Programming 2025',
      issuer: 'Ethel Programming Computer Programming Services',
      year: '2025',
      image: '/python.png'
    },
    {
      name: 'SQL Database Seminar 2025',
      issuer: 'Ethel Programming Computer Programming Services',
      year: '2025',
      image: '/sql.png'
    },
    {
      name: 'Web Hosting and Web Development',
      issuer: 'Ethel Programming Computer Programming Services',
      year: '2025',
      image: '/web.png'
    }
  ]

  const [selectedCert, setSelectedCert] = useState<Certification | null>(null)

  return (
    <section id="experience" className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Experience & Education
          </h2>
          <div className="w-24 h-1 bg-black dark:bg-white mx-auto mb-6"></div>
          <p className="text-lg text-gray-800 dark:text-gray-200 max-w-2xl mx-auto">
            My professional journey and educational background
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-8">Work Experience</h3>
            <div className="space-y-4">
              {experience.map((job, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                    <div className="mb-2 sm:mb-0">
                      <h4 className="text-base md:text-lg font-semibold text-black dark:text-white">{job.title}</h4>
                      <p className="text-blue-600 font-medium text-sm">{job.company}</p>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full w-fit">
                      {job.period}
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {job.achievements.slice(0, 4).map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start text-xs md:text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                        {achievement}
                      </li>
                    ))}
                    {job.achievements.length > 4 && (
                      <li className="text-xs text-gray-500 dark:text-gray-400 ml-3">
                        +{job.achievements.length - 4} more achievements
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-black dark:text-white mb-8">Education</h3>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3">
                    <div className="mb-2 sm:mb-0">
                      <h4 className="text-base md:text-lg font-semibold text-black dark:text-white">{edu.degree}</h4>
                      <p className="text-blue-600 font-medium text-sm">{edu.school}</p>
                    </div>
                    <span className="text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full w-fit">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-2xl font-semibold text-black dark:text-white mb-8">Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {certifications.map((cert, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-all duration-300"
                    onClick={() => setSelectedCert(cert as Certification)}
                  >
                    <div className="flex flex-col">
                      <div className="mb-2">
                        <h4 className="font-semibold text-black dark:text-white text-sm leading-tight">{cert.name}</h4>
                        <p className="text-xs text-gray-600 dark:text-gray-300">{cert.issuer}</p>
                      </div>
                      <span className="text-xs text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full w-fit">
                        {cert.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal for certificate details */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-md shadow-xl relative">
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl font-bold"
                aria-label="Close"
              >
                ×
              </button>
              <h3 className="text-2xl font-bold mb-4 text-black dark:text-white">{selectedCert.name}</h3>
              <p className="text-gray-800 dark:text-gray-200 mb-2">Issuer: {selectedCert.issuer}</p>
              <p className="text-gray-800 dark:text-gray-200 mb-4">Year: {selectedCert.year}</p>
              {/* Show certificate image if available */}
              {selectedCert.image ? (
                <img src={selectedCert.image} alt={selectedCert.name} className="w-full h-48 object-contain rounded bg-gray-100 dark:bg-gray-800" />
              ) : (
                <div className="w-full h-48 bg-gray-100 dark:bg-gray-800 rounded flex items-center justify-center text-gray-400">
                  Certificate Image/Details Here
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Experience 