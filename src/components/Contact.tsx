import { motion } from "motion/react";
import { Mail, Phone, Linkedin, Github, Instagram, MessageCircle, FileText } from "lucide-react";
import resume from '@/utils/data/narendra_resume.pdf'

export const Contact = () => {
  const socials = [
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/narendra-anyam/", color: "hover:text-blue-500" },
    { name: "GitHub", icon: <Github className="w-5 h-5" />, href: "https://github.com/narendra101", color: "hover:text-white" },
    { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "https://www.instagram.com/_bingo_______/", color: "hover:text-pink-500" },
    { name: "WhatsApp", icon: <MessageCircle className="w-5 h-5" />, href: "https://wa.me/+919133513373", color: "hover:text-green-500" },
    { name: "Resume", icon: <FileText className="w-5 h-5" />, href: resume, color: "hover:text-orange-500" },
  ];

  return (
    <section id="contact" className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-6xl md:text-8xl font-bold tracking-tighter mb-12">
              Let's <br />
              <span className="text-orange-500">Connect.</span>
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-md leading-relaxed">
              Have a project in mind or just want to say hi? My inbox is always open.
            </p>
            
            <div className="space-y-6">
              <a 
                href="mailto:narendra11470@gmail.com" 
                className="group flex items-center gap-4 text-2xl font-medium hover:text-orange-500 transition-colors"
              >
                <div className="p-4 rounded-full bg-white/5 group-hover:bg-orange-500 transition-colors">
                  <Mail className="w-6 h-6 group-hover:text-white" />
                </div>
                narendra11470@gmail.com
              </a>
              <a 
                href="tel:+919133513373" 
                className="group flex items-center gap-4 text-2xl font-medium hover:text-orange-500 transition-colors"
              >
                <div className="p-4 rounded-full bg-white/5 group-hover:bg-orange-500 transition-colors">
                  <Phone className="w-6 h-6 group-hover:text-white" />
                </div>
                +91 9133513373
              </a>
            </div>
          </div>

          <div className="flex flex-col justify-end">
            <h3 className="text-sm font-mono tracking-widest uppercase text-white/30 mb-8 border-b border-white/10 pb-4">
              Social Channels
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  className={`flex flex-col items-center justify-center p-8 rounded-2xl border border-white/5 bg-white/[0.02] ${social.color} transition-all duration-300 transform hover:-translate-y-2`}
                >
                  <div className="mb-4">{social.icon}</div>
                  <span className="text-xs font-mono uppercase tracking-widest">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
