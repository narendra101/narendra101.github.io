import { Canvas } from "@react-three/fiber";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { Suspense } from "react";
import { AIGlowScene } from "./AIGlowScene";

type AISkillsGlowCardProps = {
  title: string;
  index: number;
  skills: string[];
};

export function AISkillsGlowCard({ title, index, skills }: AISkillsGlowCardProps) {
  const numberLabel = `0${index + 1}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full min-w-0 rounded-2xl isolate"
    >
      {/* Continuous gradient border — slides along edges, no gaps */}
      <motion.div
        className="rounded-2xl p-px"
        style={{
          background:
            "linear-gradient(90deg, #f97316, #a78bfa, #fbbf24, #c084fc, #f97316)",
          backgroundSize: "300% 100%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
      >
        <motion.div
          className="relative w-full min-w-0 overflow-hidden rounded-2xl bg-[#0a0a0a]/95"
          animate={{
            boxShadow: [
              "inset 0 0 30px rgba(249,115,22,0.04)",
              "inset 0 0 40px rgba(167,139,250,0.08)",
              "inset 0 0 30px rgba(249,115,22,0.04)",
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-x-0 top-0 z-0 h-36 pointer-events-none overflow-hidden opacity-90">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 45 }}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              dpr={[1, 1.5]}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
            >
              <Suspense fallback={null}>
                <AIGlowScene />
              </Suspense>
            </Canvas>
          </div>

          <div className="pointer-events-none absolute inset-0 z-1 bg-gradient-to-b from-[#0a0a0a]/20 via-[#0a0a0a]/60 to-[#0a0a0a]" />

          <div className="relative z-10 flex min-w-0 flex-col p-8">
            <motion.h3
              className="mb-6 flex justify-between gap-4 border-b border-orange-500/30 pb-2 font-mono text-sm uppercase tracking-widest text-orange-500"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <span className="min-w-0">{title}</span>
              <span className="shrink-0 text-white/20">{numberLabel}</span>
            </motion.h3>

            <motion.div
              className="mb-6 flex min-w-0 flex-wrap gap-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
              }}
            >
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={{
                    hidden: { opacity: 0, y: 10, scale: 0.92 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: { type: "spring", stiffness: 320, damping: 22 },
                    },
                  }}
                  whileHover={{
                    scale: 1.04,
                    boxShadow: "0 0 18px rgba(249,115,22,0.35)",
                    borderColor: "rgba(251,146,60,0.8)",
                  }}
                  className="cursor-default rounded-md border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-sm text-orange-100 transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              className="relative mt-auto flex justify-end pt-2"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, type: "spring", stiffness: 260, damping: 20 }}
            >
              <motion.div
                className="relative flex items-center gap-1.5 overflow-hidden rounded-full px-3 py-1"
                whileHover={{ scale: 1.03 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "linear-gradient(90deg, #f97316, #a78bfa, #fbbf24, #f97316)",
                    backgroundSize: "300% 100%",
                  }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <div className="absolute inset-px rounded-full bg-[#0a0a0a]/90" />
                <Sparkles className="relative z-10 h-3 w-3 text-orange-400" />
                <span className="relative z-10 text-[10px] font-mono uppercase tracking-[0.2em] text-orange-300">
                  Core Focus
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Soft outer glow — does not affect border shape */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10 rounded-2xl"
        animate={{
          boxShadow: [
            "0 0 24px rgba(249,115,22,0.12)",
            "0 0 32px rgba(167,139,250,0.18)",
            "0 0 24px rgba(249,115,22,0.12)",
          ],
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
