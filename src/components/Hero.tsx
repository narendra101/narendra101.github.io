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
          I'm an AI and full stack developer, Committed to delivering innovative solutions that enhance user experience and drive business growth. 
        </p>
        {/* block 1 */}
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.9 }}
          animate={{ 
            opacity: 1, 
            y: [0, -4, 0],
            scale: 1
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.8 },
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          className="flex justify-center mb-4"
        >
          <div className="group relative overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-5 py-2">
            
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <motion.span
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="relative flex items-center gap-2 text-sm md:text-base text-white/70"
            >
              <span className="text-orange-400 text-lg">📍</span>
              <span className="font-medium">
                India
              </span>
            </motion.span>
          </div>
        </motion.div>
        {/* block 1 */}
        {/* block 2 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex justify-center mt-1 mb-6"
        >
          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="group relative overflow-hidden rounded-full border border-orange-500/20 bg-white/[0.03] backdrop-blur-md px-5 py-2"
          >
            {/* subtle glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-orange-500/10 via-transparent to-orange-500/10" />

            <div className="relative flex items-center gap-2 text-sm text-white/60">
              <span className="text-orange-400">✦</span>

              <span>
                Building AI products + occasionally crafting content,
                branding & digital experiences.
              </span>
            </div>
          </motion.div>
        </motion.div>
        {/* block 2 */}
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
