/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const educationData = [
    {
        degree: 'Master of Science in Computer Science',
        institution: 'Stanford University',
        period: '2016 - 2018',
        description: 'Focused on artificial intelligence and distributed systems. Completed a thesis on scalable machine learning algorithms.'
    },
    {
        degree: 'Bachelor of Science in Software Engineering',
        institution: 'University of California, Berkeley',
        period: '2012 - 2016',
        description: 'Graduated with honors. Active member of the university coding club and participated in several hackathons.'
    }
]

const Education: React.FC = () => {
  return (
    <section id="education" className="min-h-screen flex flex-col justify-center items-center py-24 px-6 sm:px-12 lg:px-20 bg-slate-900/50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Education</h2>
        <div className="max-w-4xl mx-auto space-y-8">
            {educationData.map((edu, index) => (
                <div key={index} className="bg-slate-800 p-6 rounded-lg shadow-lg hover:shadow-cyan-500/20 transition-shadow duration-300 transform hover:-translate-y-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-start">
                        <div>
                            <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                            <p className="text-cyan-400 font-semibold">{edu.institution}</p>
                        </div>
                        <p className="text-slate-400 text-sm flex-shrink-0">{edu.period}</p>
                    </div>
                    <p className="mt-4 text-slate-300">{edu.description}</p>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Education;