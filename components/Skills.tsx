/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const skillsData = [
  {
    category: 'Frontend',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3', 'JavaScript', 'NextJS', 'JQuery', 'Bootstrap', 'THREE JS', 'Framer Motion'],
  },
  {
    category: 'Backend',
    skills: ['Node.js','Python', 'FastAPI', 'Express.js', 'Flask', 'REST APIs', 'Django', 'Django Rest Framework', 'SQL Alchemy'],
  },
  {
    category: 'Databases & Data Engineering',
    skills: ['PostgreSQL', 'MongoDB', 'Sqlite3', 'SQL', 'ETL Pipelines', 'Snowflakes'],
  },
  {
    category: 'DevOps & Cloud',
    skills: ['Docker', 'Podman', 'CI/CD', 'AWS', 'Azure', 'Git', 'Linux'],
  },
  {
    category: 'AI',
    skills: ['Prompt Engineering', 'Vector Databases', 'Geneartive AI', 'ChromaDB', 'LangChain', 'OpenAI', 'LLM'],
  },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="min-h-screen flex flex-col justify-center items-center py-24 px-6 sm:px-12 lg:px-20">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillsData.map((categoryData) => (
            <div key={categoryData.category} className="bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4">{categoryData.category}</h3>
              <ul className="space-y-2">
                {categoryData.skills.map((skill) => (
                  <li key={skill} className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <span className="text-slate-300">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;