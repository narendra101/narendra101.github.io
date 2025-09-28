/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import Navbar from './components/Navbar';
import Landing from './components/Landing';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SocialLinks from './components/SocialLinks';

const App: React.FC = () => {
  return (
    <div className="bg-slate-900 text-slate-300">
      <Navbar />
      <SocialLinks />
      <main>
        <Landing />
        <About />
        <Skills />
        {/* <Projects /> */}
        <Experience />
        {/* <Education /> */}
        {/* <Contact /> */}
      </main>
      <Footer />
    </div>
  );
};

export default App;