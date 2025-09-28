/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center items-center py-24 px-6 sm:px-12 lg:px-20 bg-slate-900/50">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-8 md:mb-12 text-white">About Me</h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 items-center">
          <div className="md:col-span-1 flex justify-center">
            <img 
              src="images/narendra_image.jpeg" 
              alt="John Doe"
              className="rounded-full w-48 h-48 md:w-64 md:h-64 border-4 border-cyan-400 object-cover shadow-lg shadow-cyan-500/20"
            />
          </div>
          <div className="md:col-span-2">
            <p className="text-lg mb-6 text-slate-300 leading-relaxed">
              I am a passionate and versatile developer with a strong foundation in building scalable web applications and robust data pipelines. With expertise across the full stack, I enjoy tackling complex problems and turning ideas into high-quality, production-ready software.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed">
              From crafting intuitive user interfaces with React to engineering efficient backend systems and data-intensive workflows, I am driven by a curiosity for new technologies and a commitment to best practices in software development. I'm always eager to learn and apply new skills to create elegant and efficient solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;