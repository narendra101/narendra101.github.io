/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const Navbar: React.FC = () => {
  // const navLinks = ['About', 'Skills', 'Projects', 'Experience', 'Education', 'Contact'];
  const navLinks = ['About', 'Skills', 'Experience'];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
        <div className="scroll-watcher"></div>
        <nav className="glassmorphism container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#landing" className="text-2xl font-bold font-mono text-cyan-400 hover:text-cyan-300 transition-colors">NA</a>
        <ul className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
            <li key={link}>
                <a 
                href={`#${link.toLowerCase()}`} 
                className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 relative group"
                >
                {link}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
                </a>
            </li>
            ))}
        </ul>
        </nav>
    </header>
  );
};

export default Navbar;