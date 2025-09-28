/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900/50 border-t border-slate-800 py-8">
        <div className="container mx-auto text-center text-slate-400">
            <div className="flex justify-center space-x-6 mb-4">
                <a href="https://github.com/narendra101" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">GitHub</a>
                <a href="https://www.linkedin.com/in/narendra-anyam/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">LinkedIn</a>
                <a href="https://x.com/Narendr37543360" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">Twitter</a>
            </div>
            <p>&copy; {new Date().getFullYear()} John Doe. All rights reserved.</p>
        </div>
    </footer>
  );
};

export default Footer;