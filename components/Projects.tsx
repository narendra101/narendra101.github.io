/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const projects = [
  {
    title: 'Typing Speed Test',
    description: 'A web-based typing speed test to measure typing accuracy and speed.',
    image: 'images/typing_test.png',
    tags: ['Javascript', 'HTML', 'CSS', 'Bootstrap'],
    liveUrl: 'https://typtestnarendra.ccbp.tech/',
    // sourceUrl: 'https://github.com',
  },
  {
    title: 'Real-Time Analytics Dashboard',
    description: 'A sleek, responsive e-commerce website showcasing modern UI design and core shopping features for portfolio demonstration.',
    image: 'images/ecom.png',
    tags: ['Javascript', 'HTML', 'CSS', 'Bootstrap'],
    liveUrl: 'https://github.com',
    // sourceUrl: 'https://github.com',
  },
  {
    title: 'Cloud Infrastructure Automation',
    description: 'Infrastructure as Code (IaC) project to automate the deployment and management of services on GCP using Terraform.',
    image: 'https://picsum.photos/seed/project3/600/400',
    tags: ['Terraform', 'GCP', 'Docker', 'CI/CD'],
    liveUrl: 'https://github.com',
    sourceUrl: 'https://github.com',
  },
];

const Projects: React.FC = () => {
  return (
    <section id="projects" className="min-h-screen flex flex-col justify-center items-center py-24 px-6 sm:px-12 lg:px-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Projects</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-slate-800 rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 group flex flex-col">
              <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-slate-400 mb-4 flex-grow">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="bg-slate-700 text-cyan-400 text-xs font-mono px-2 py-1 rounded-full">{tag}</span>
                  ))}
                </div>
                <div className="flex justify-end space-x-4 mt-auto">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white transition-colors">Live Demo</a>
                  {/* <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white transition-colors">Source Code</a> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;