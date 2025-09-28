/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const experiences = [
  {
    role: 'Data Engineer',
    company: 'Acuity Knowledge Partners',
    period: 'May 2024 - Present',
    description: 'Working in dymanic Geneartive AI environment to build and maintain data pipelines for a large-scale SaaS platform. Working on the backend for the platform, using Python, SQL, and cloud data warehousing solutions on AWS.',
  },
  {
    role: 'Software Developer',
    company: 'Codework',
    period: 'Dec 2024 - Apr 2025',
    description: 'Developed and maintained scallable software solutions',
  },
  {
    role: 'Software Developer',
    company: 'Tcare (p) Ltd',
    period: 'Mar 2024 - Nov 2024',
    description: 'Built and maintained robust software applications and web applications and worked on both frontend and backend and deployment',
  },
  {
    role: 'Software Engineer',
    company: 'Applied Data Finance',
    period: 'Jan 2022 - Dec 2023',
    description: 'Worked on the backend of a complex and dynamic web application using Python, Django, and Mysql ensuring secure and efficient data management and User aquisition flow.',
  },
  {
    role: 'Software Engineer Intern',
    company: 'Applied Data Finance',
    period: 'May 2021 - Jan 2022',
    description: 'Worked on Automation and Unit testing for the backend of a complex and dynamic web application using Python, Django, and Mysql.ski Excelled in the development of a web application using Python, Django, and Mysql ensuring secure and efficient data management and User aquisition flow.',
  },
];

const Experience: React.FC = () => {
  return (
    <section id="experience" className="min-h-screen flex flex-col justify-center items-center py-24 px-6 sm:px-12 lg:px-20 bg-slate-900/50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 md:mb-16 text-white">Experience</h2>
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Timeline */}
          <div className="absolute left-6 w-0.5 h-full bg-slate-700 md:left-1/2 md:-translate-x-1/2"></div>
          
          {experiences.map((exp, index) => (
            <div key={index} className="mb-8 pl-16 md:pl-0">
              <div className={`flex items-center md:justify-between md:flex-row${index % 2 !== 0 ? '-reverse' : ''}`}>
                
                {/* Spacer on desktop */}
                <div className="hidden md:block md:w-5/12"></div>

                {/* Timeline Dot */}
                <div className="absolute left-6 z-10 flex items-center bg-cyan-400 shadow-xl w-8 h-8 rounded-full transform -translate-x-1/2 md:left-1/2">
                   <div className="w-4 h-4 bg-slate-900 rounded-full mx-auto"></div>
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-5/12 bg-slate-800 rounded-lg shadow-xl p-6 ${index % 2 !== 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <p className="text-sm text-cyan-400">{exp.period}</p>
                  <h3 className="text-xl font-bold mt-1 text-white">{exp.role}</h3>
                  <h4 className="text-md font-semibold text-slate-400 mb-2">{exp.company}</h4>
                  <p className="text-slate-400">{exp.description}</p>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;