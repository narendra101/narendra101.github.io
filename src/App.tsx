import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { motion, useScroll, useSpring } from "motion/react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Experience } from "./components/Experience";
import { Contact } from "./components/Contact";
import { Scene3D } from "./components/Scene3D";

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#050505] text-white selection:bg-orange-500 selection:text-white">
      {/* 3D Background Scene */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene3D />
      </div>

      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-orange-500 origin-left z-50"
        style={{ scaleX }}
      />

      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        <Skills />
        <Experience />
        <Contact />
      </main>

      <footer className="relative z-10 py-10 border-t border-white/10 text-center text-white/40 text-sm">
        <p>© {new Date().getFullYear()} Narendra. Built with Passion & Caffeine.</p>
      </footer>
    </div>
  );
}
