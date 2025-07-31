"use client"

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
};

const tabs = Object.keys(skillsData);

const AllSkillsPage = () => {
  return (
    <section className="py-20 bg-white dark:bg-black relative overflow-hidden min-h-screen">
      {/* Monochrome background decoration */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-gray-200 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-gray-300 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
            All Skills & Technologies
          </h2>
          <div className="w-24 h-1 bg-gray-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here is the complete list of my skills and technologies, including proficiency graphs.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tabs.map((tab) => (
            <div key={tab} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-bold text-black dark:text-white mb-4">{tab}</h3>
              <ul className="space-y-4 mb-4">
                {skillsData[tab as keyof typeof skillsData].skills.map((skill, idx) => (
                  <li key={idx}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-800 dark:text-gray-200 font-medium">{skill.name}</span>
                      <span className="text-gray-600 font-semibold">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <div
                        className="bg-gray-600 h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {skillsData[tab as keyof typeof skillsData].technologies.map((tech, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AllSkillsPage; 