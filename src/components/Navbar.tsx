import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

export const Navbar = () => {
  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Skills", href: "#skills" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full border border-white/10 bg-black/50 backdrop-blur-md"
      id="main-nav"
    >
      <ul className="flex items-center gap-8">
        {navItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              className="text-sm font-medium tracking-wider uppercase text-white/70 hover:text-orange-500 transition-colors"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};
