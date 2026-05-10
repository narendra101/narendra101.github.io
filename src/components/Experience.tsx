import { motion } from "motion/react";

const experiences = [
  {
    role: "Data Engineer",
    company: "Acuity Analytics",
    period: "May 2025 - Current",
    current: true
  },
  {
    role: "Software Developer",
    company: "CodeWork",
    period: "Dec 2024 - April 2025"
  },
  {
    role: "Software Developer",
    company: "Tcare (p) Ltd",
    period: "March 2024 - Nov 2024"
  },
  {
    role: "Software Engineer",
    company: "Applied Data Finance",
    period: "Jan 2022 - Dec 2023"
  },
  {
    role: "Software Development Intern",
    company: "Applied Data Finance",
    period: "Jan 2021 - Jan 2022"
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20 text-right">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 italic font-serif">Experience</h2>
          <div className="h-1 w-20 bg-orange-500 ml-auto" />
        </div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/10 before:to-transparent">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.period}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Dot */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white/10 bg-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors group-hover:border-orange-500">
                <div className={`w-3 h-3 rounded-full ${exp.current ? 'bg-orange-500 animate-pulse' : 'bg-white/20'}`} />
              </div>

              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.03] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <time className="font-mono text-xs text-orange-500 px-2 py-1 bg-orange-500/10 rounded uppercase">
                    {exp.period}
                  </time>
                </div>
                <p className="text-white/60 font-medium tracking-wide uppercase text-sm">
                  {exp.company}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
