import { motion } from "motion/react";
import { ArrowRight, Phone } from "lucide-react";

export const Hero = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 text-center overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl"
      >
        <span className="text-orange-500 font-mono tracking-[0.3em] uppercase text-sm mb-6 block">
          AI and Full Stack Developer
        </span>
        
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 leading-[1.1]">
          I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Narendra</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          I'm an AI and full stack developer from AP, India. Committed to delivering innovative solutions that enhance user experience and drive business growth. 
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.a
            href="#skills"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-orange-500 hover:text-white transition-all duration-300"
          >
            Explore My Skills
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
          
          <a
            href="tel:+919133513373"
            className="flex items-center gap-3 text-white/80 hover:text-white transition-colors py-4 px-6"
          >
            <Phone className="w-4 h-4 text-orange-500" />
            <span className="font-mono text-sm tracking-widest">+91 9133513373</span>
          </a>
        </div>
      </motion.div>

      {/* Decorative vertical lines */}
      <div className="absolute bottom-10 left-10 h-32 w-[1px] bg-gradient-to-t from-orange-500 to-transparent opacity-50" />
      <div className="absolute top-10 right-10 h-32 w-[1px] bg-gradient-to-b from-white/20 to-transparent" />
    </section>
  );
};
