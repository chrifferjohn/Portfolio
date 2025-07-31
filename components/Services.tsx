'use client'

import { FaCode, FaMobile, FaPalette, FaDatabase, FaPlug, FaCogs } from 'react-icons/fa'

const Services = () => {
  const services = [
    {
      icon: <FaCode size={36} />, // simple icon
      title: 'Web Development',
      description: 'Custom responsive websites and web applications built with modern frameworks and best practices.',
      features: [
        'Technologies: Vanilla Javascript, React, Next.js, Laravel, PHP'
      ]
    },
    {
      icon: <FaMobile size={36} />, // simple icon
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences.',
      features: [
        'Technologies: React Native, Android'
      ]
    },
    {
      icon: <FaPalette size={36} />, // simple icon
      title: 'UI/UX Design',
      description: 'User-centered design solutions that are both aesthetically pleasing and highly functional.',
      features: [
        'Technologies: Figma, Adobe XD, Tailwind CSS'
      ]
    },
    {
      icon: <FaDatabase size={36} />, // simple icon
      title: 'Database Design',
      description: 'Efficient and scalable database architectures tailored to your specific requirements.',
      features: [
        'Technologies: MySQL, SQLi, MongoDB'
      ]
    },
    {
      icon: <FaPlug size={36} />, // simple icon
      title: 'API Development',
      description: 'Robust and secure APIs that enable seamless integration between different systems.',
      features: [
        'Technologies: RESTful APIs, GraphQL, Laravel'
      ]
    },
    {
      icon: <FaCogs size={36} />, // simple icon
      title: 'Custom Software Solutions',
      description: 'Tailor-made software solutions designed to address your unique business challenges.',
      features: [
        'Technologies: JavaScript, PHP, Python'
      ]
    }
  ]

  return (
    <section id="services" className="py-24 bg-white dark:bg-black relative">
      {/* Monochrome background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/3 left-20 w-64 h-64 bg-gray-200 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-20 w-64 h-64 bg-gray-300 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20 slide-up">
          <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-6">
            My <span>Services</span>
          </h2>
          <div className="w-32 h-1.5 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            I offer a wide range of development services to help bring your ideas to life. Here's how I can help you with your next project.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group modern-card bg-white dark:bg-gray-800 p-8 rounded-3xl hover-lift relative overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Removed gradient background as service.gradient does not exist */}
              
              {/* Icon with gradient background */}
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <div className="text-black dark:text-white">
                    {service.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-2xl font-bold text-black dark:text-white mb-4 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed text-lg">
                  {service.description}
                </p>

                {/* Technologies */}
                <div className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <div className="w-3 h-3 bg-gray-400 rounded-full mr-4 mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>


              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Services 