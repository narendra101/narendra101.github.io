/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`Thank you for your message, ${formData.name}! (This is a demo, no email was sent)`);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center items-center py-24 px-6 sm:px-12 lg:px-20">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 text-white">Get In Touch</h2>
        <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
          I'm currently open to new opportunities and collaborations. Feel free to reach out if you have a project in mind, want to connect, or just want to say hi!
        </p>
        <div className="max-w-xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            <input 
              type="text" 
              name="name" 
              placeholder="Your Name" 
              value={formData.name}
              onChange={handleChange}
              required 
              className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-shadow"
            />
            <input 
              type="email" 
              name="email" 
              placeholder="Your Email" 
              value={formData.email}
              onChange={handleChange}
              required 
              className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-shadow"
            />
            <textarea 
              name="message" 
              placeholder="Your Message" 
              rows={5} 
              value={formData.message}
              onChange={handleChange}
              required 
              className="w-full bg-slate-800 border border-slate-700 rounded-md p-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-shadow"
            ></textarea>
            <button type="submit" className="w-full py-3 px-6 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-md transition-colors duration-300">
              Send Message
            </button>
          </form>
        </div>
        <div className="mt-12">
            <p className="text-slate-400 mb-4">Or find me on:</p>
            <div className="flex justify-center space-x-6">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">GitHub</a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">LinkedIn</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">Twitter</a>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;