import { motion } from "motion/react";

const skillCategories = [
  {
    title: "Frontend Development",
    skills: ["HTML", "CSS", "JavaScript", "ReactJS", "NextJS", "THREEJS", "TailwindCSS", "Jquery", "Bootstrap 5"]
  },
  {
    title: "Backend Development",
    skills: ["Python", "FastAPI", "SQLAlchemy", "NodeJS", "Django", "Flask", "Expressjs 5"]
  },
  {
    title: "Databases",
    skills: ["MySQL", "PostgreSQL", "SQLite3", "MongoDB"]
  },
  {
    title: "Generative AI & Tech",
    skills: ["Generative AI", "LLM", "LLM Agents", "OpenAI", "Prompt Engineering", "Python Web Scrapping"]
  },
  {
    title: "Tools & Libraries",
    skills: ["AWS (EC2)", "Swagger", "Docker", "Github", "Jenkins", "Numpy", "Pandas", "Regex", "C/C++"]
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="py-32 px-6 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 italic font-serif">Skills</h2>
          <div className="h-1 w-20 bg-orange-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-8 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
            >
              <h3 className="text-orange-500 font-mono text-sm uppercase tracking-widest mb-6 border-b border-orange-500/20 pb-2 flex justify-between">
                {category.title}
                <span className="text-white/20">0{idx + 1}</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-md hover:border-orange-500/50 hover:text-orange-500 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
