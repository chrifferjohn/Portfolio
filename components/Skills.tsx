'use client'

import { useState } from 'react'

const Skills = () => {
  const [activeTab, setActiveTab] = useState('Frontend')

  const skillsData = {
    Frontend: {
      title: 'Frontend Development',
      skills: [
        { name: 'React.js', percentage: 95 },
        { name: 'Next.js', percentage: 90 },
        { name: 'TypeScript', percentage: 85 },
        { name: 'Tailwind CSS', percentage: 88 },
        { name: 'JavaScript', percentage: 92 },
        { name: 'HTML/CSS', percentage: 95 }
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'GraphQL', 'Sass', 'Bootstrap']
    },
    Backend: {
      title: 'Backend Development',
      skills: [
        { name: 'Node.js', percentage: 88 },
        { name: 'PHP', percentage: 90 },
        { name: 'Python', percentage: 80 },
        { name: 'Express.js', percentage: 85 },
        { name: 'REST APIs', percentage: 90 },
        { name: 'GraphQL', percentage: 75 }
      ],
      technologies: ['Node.js', 'Express', 'PHP', 'Python', 'Django', 'FastAPI', 'REST APIs', 'GraphQL']
    },
    Database: {
      title: 'Database Management',
      skills: [
        { name: 'MySQL', percentage: 92 },
        { name: 'MongoDB', percentage: 85 },
        { name: 'PostgreSQL', percentage: 82 },
        { name: 'Firebase', percentage: 80 },
        { name: 'Redis', percentage: 70 },
        { name: 'Database Design', percentage: 88 }
      ],
      technologies: ['MySQL', 'MongoDB', 'PostgreSQL', 'Redis', 'Firebase', 'SQLite', 'Database Design', 'Query Optimization']
    },
    Tools: {
      title: 'Development Tools',
      skills: [
        { name: 'Git/GitHub', percentage: 90 },
        { name: 'VS Code', percentage: 95 },
        { name: 'Docker', percentage: 75 },
        { name: 'AWS', percentage: 70 },
        { name: 'Linux', percentage: 80 },
        { name: 'CI/CD', percentage: 72 }
      ],
      technologies: ['VS Code', 'Git', 'GitHub', 'Postman', 'Docker', 'AWS', 'Linux', 'Nginx', 'CI/CD', 'Figma']
    },
    'Other Skills': {
      title: 'Additional Skills',
      skills: [
        { name: 'UI/UX Design', percentage: 85 },
        { name: 'Mobile Development', percentage: 80 },
        { name: 'Problem Solving', percentage: 95 },
        { name: 'Team Collaboration', percentage: 90 },
        { name: 'Project Management', percentage: 82 },
        { name: 'System Analysis', percentage: 88 }
      ],
      technologies: ['React Native', 'Flutter', 'PWA', 'Figma', 'Adobe XD', 'Agile', 'Scrum', 'Testing']
    }
  }

  const tabs = Object.keys(skillsData)

  // Only show top 3 skills per category for the main section
  const importantSkillsData = Object.fromEntries(
    Object.entries(skillsData).map(([key, value]) => [
      key,
      {
        ...value,
        skills: value.skills.slice(0, 3),
        technologies: value.technologies.slice(0, 3),
      },
    ])
  )

  return (
    <section id="skills" className="py-20 bg-white dark:bg-black relative overflow-hidden">
      {/* Monochrome background decoration */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-gray-200 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-gray-300 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gray-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            My technical expertise spans across various technologies and frameworks
          </p>
        </div>

        {/* View All Skills Button - right above Database category */}
        <div className="flex justify-end md:justify-end mb-4">
          <a
            href="/skills/all"
            className="inline-block text-black dark:text-white px-8 py-3 font-semibold transition-all duration-300 hover:underline hover:text-blue-600 dark:hover:text-blue-400 bg-transparent border-none shadow-none rounded-none"
          >
            View All Skills
          </a>
        </div>

        {/* Categorized Skills Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {tabs.map((tab) => (
            <div key={tab} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-3">
              <h3 className="text-sm md:text-base font-bold text-black dark:text-white mb-2">{tab}</h3>
              <ul className="space-y-1 mb-2">
                {importantSkillsData[tab as keyof typeof importantSkillsData].skills.map((skill, idx) => (
                  <li key={idx} className="text-xs md:text-sm text-gray-800 dark:text-gray-200 font-medium">
                    {skill.name}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1">
                {importantSkillsData[tab as keyof typeof importantSkillsData].technologies.map((tech, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded font-normal">
                    {tech}
                  </span>
                  ))}
              </div>
                    </div>
                  ))}
            </div>

      </div>
    </section>
  )
}

export default Skills 