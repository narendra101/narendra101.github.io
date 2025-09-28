/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';

const socialLinks = [
  { name: 'GitHub', url: 'https://github.com/narendra101', icon: 'G' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/narendra-anyam/', icon: 'in' },
  { name: 'Twitter', url: 'https://x.com/Narendr37543360', icon: 'T' },
];

const SocialLinks: React.FC = () => {
  return (
    <div className="hidden md:flex flex-col top-[35%] left-0 fixed z-40">
      <ul>
        {socialLinks.map(link => (
          <li key={link.name} className="w-[160px] h-[60px] flex justify-between items-center ml-[-100px] hover:ml-[-10px] duration-300 bg-slate-700">
            <a 
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-between items-center w-full text-slate-300"
            >
              <span className="pl-4">{link.name}</span>
              <div className="w-12 h-full bg-cyan-500 flex items-center justify-center text-white font-bold">
                {link.icon}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;