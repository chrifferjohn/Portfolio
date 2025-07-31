'use client'

const About = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-black relative">
      {/* Monochrome background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-gray-200 dark:bg-gray-800 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-gray-300 dark:bg-gray-700 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20 slide-up">
            <h2 className="text-5xl md:text-6xl font-bold text-black dark:text-white mb-6">
              About <span>Me</span>
            </h2>
            <div className="w-32 h-1.5 bg-gray-800 dark:bg-gray-200 mx-auto mb-8 rounded-full"></div>
            <p className="text-xl text-gray-800 dark:text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Passionate developer crafting digital solutions with precision and creativity
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* About Image on the left */}
            <div className="text-center lg:text-left order-2 lg:order-1 fade-in">
              <div className="relative inline-block">
                {/* Decorative elements removed */}
                <img 
                  src="/about.png" 
                  alt="Chriffer John Langomes - About Me" 
                  className="relative w-full h-[600px] mx-auto lg:mx-0 rounded-3xl object-cover transition-transform duration-300 hover:scale-105 shadow-lg border border-gray-300 dark:border-gray-700"
                />
              </div>
            </div>

            {/* About Content */}
            <div className="space-y-8 order-1 lg:order-2 slide-up">
              <div className="space-y-4">
                <h3 className="text-4xl font-bold text-black dark:text-white">
                  Chriffer John <span>Langomes</span>
                </h3>
                <h4 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Who am I?</h4>
              </div>

              <div className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed">
                <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl space-y-6 border border-gray-200 dark:border-gray-700">
                  <p>
                    I aim to be a <span className="font-semibold text-black dark:text-white">Junior Software Developer</span> and have prior experience in web and mobile development. My internship with the <span className="font-semibold text-black dark:text-white">JHCSC Library</span> helped me polish my PHP, MySQL, JavaScript, and React Native skills as I worked on real world problems such as a Library Inventory System and a Library Book QR Code Scanner App.
                  </p>
                  <p>
                    Learning emerging technologies excites me, and I enjoy coding to materialize the concept. I am constantly working towards my passion of being able to construct <span className="font-semibold text-black dark:text-white">efficient and simple to use systems</span> and make strides in my technical know how.
                  </p>
                  <p>
                    During my free time, I challenge myself with personal projects to enhance my web and mobile development skills, learn new programming languages, and follow latest trends in <span className="font-semibold text-black dark:text-white">UI/UX design</span>.
                  </p>
                </div>
              </div>

              {/* Personal Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                {[
                  { label: 'Name', value: 'Chriffer John Langomes' },
                  { label: 'Email', value: 'langomezchriff795@gmail.com' },
                  { label: 'Location', value: 'Dagohoy, Guipos Zamboanga Del sur' },
                  { label: 'Availability', value: 'Open to opportunities' }
                ].map((item, index) => (
                  <div key={index} className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <span className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">{item.label}</span>
                    <span className="block text-black dark:text-white font-semibold text-lg">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Download Resume Button */}
              <div className="mt-12">
                <a
                  href="/Chrifferjohn_Langomes_resume.pdf"
                  className="inline-flex items-center gap-3 bg-black text-white px-10 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  download
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About 