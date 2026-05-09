/* =============================================================
   AboutSection — DevGamer Studio
   Style: Neon Arcade Retro-Futurista
   About me with skills bars, tech stack and personal story
   ============================================================= */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Gamepad2, Coffee, Rocket, Terminal, Heart } from "lucide-react";

const ABOUT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663640454573/2EqbNsmqhN6YUGgqanCV2e/about-bg-kEUsFCzeruUgfU6idK7GNJ.webp";

const skills = [
  { name: "React", level: 95, color: "#22d3ee" },
  { name: "Python", level: 92, color: "#3b82f6" },
  { name: "Solidity", level: 88, color: "#10b981" },
  { name: "Angular", level: 90, color: "#dc2626" },
  { name: "PostgreSQL", level: 90, color: "#f59e0b" },
  { name: "Docker & Linux", level: 88, color: "#7c3aed" },
];

const techStack = [
  { name: "React", category: "Frontend" },
  { name: "Angular", category: "Frontend" },
  { name: "Python", category: "Backend" },
  { name: "Node.js", category: "Backend" },
  { name: "Solidity", category: "Blockchain" },
  { name: "Web3.js", category: "Blockchain" },
  { name: "PostgreSQL", category: "DB" },
  { name: "Docker", category: "DevOps" },
  { name: "Linux", category: "DevOps" },
  { name: "Git", category: "Tools" },
  { name: "TypeScript", category: "Lenguaje" },
  { name: "Ethereum", category: "Blockchain" },
];

const facts = [
  { icon: Code2, text: "Especializado en Web3 & Blockchain", color: "text-emerald-400" },
  { icon: Gamepad2, text: "Gamer y streamer en TikTok", color: "text-cyan-400" },
  { icon: Rocket, text: "Full Stack: Frontend, Backend, Blockchain", color: "text-violet-400" },
  { icon: Terminal, text: "Linux & DevOps Expert", color: "text-amber-400" },
];

function SkillBar({ skill, index, isInView }: { skill: typeof skills[0]; index: number; isInView: boolean }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span
          className="text-slate-300 text-sm"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {skill.name}
        </span>
        <span
          className="text-xs font-bold"
          style={{ color: skill.color, fontFamily: "'JetBrains Mono', monospace" }}
        >
          {skill.level}%
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.color}aa, ${skill.color})`,
            boxShadow: `0 0 8px ${skill.color}66`,
          }}
        />
      </div>
    </div>
  );
}

export default function AboutSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const skillsRef = useRef(null);
  const skillsInView = useInView(skillsRef, { once: true, margin: "-80px" });

  return (
    <section id="sobre-mi" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${ABOUT_BG})` }}
      />
      <div className="absolute inset-0 bg-[#0a0f1e]/90" />
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.1)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative z-10 container mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 mb-4">
            <Terminal className="w-3.5 h-3.5 text-violet-400" />
            <span
              className="text-violet-400 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              // sobre mí
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            El Dev <span className="gradient-text">Detrás del</span> Código
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Story + Facts */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Story card */}
            <div className="neon-card rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-violet-600/20 border border-violet-500/40 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                  <h3
                    className="text-white font-bold"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem" }}
                  >
                    Mi Historia
                  </h3>
                  <p
                    className="text-slate-500 text-xs"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    Dev + Gamer + Web3 Enthusiast
                  </p>
                </div>
              </div>
              <p
                className="text-slate-300 text-sm leading-relaxed mb-3"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Soy José Gregorio, desarrollador full-stack especializado en Python, PostgreSQL, Solidity, Angular, React, Docker y Linux. Creo soluciones web3, aplicaciones escalables y contratos inteligentes de alta calidad.
              </p>
              <p
                className="text-slate-400 text-sm leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Fuera del código, soy streamer en TikTok (@wildrif) donde comparto mi pasión por los videojuegos. Creo que la creatividad del gaming y la lógica del desarrollo son el combo perfecto para innovar.
              </p>
            </div>

            {/* Facts */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {facts.map((fact, i) => (
                <motion.div
                  key={fact.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={titleInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="neon-card rounded-xl p-4 flex items-start gap-3"
                >
                  <fact.icon className={`w-5 h-5 ${fact.color} flex-shrink-0 mt-0.5`} />
                  <span
                    className="text-slate-300 text-sm"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {fact.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Skills + Tech Stack */}
          <motion.div
            ref={skillsRef}
            initial={{ opacity: 0, x: 40 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Skills */}
            <div className="neon-card rounded-2xl p-6">
              <h3
                className="text-white font-bold mb-5 flex items-center gap-2"
                style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.9rem" }}
              >
                <Code2 className="w-4 h-4 text-cyan-400" />
                Habilidades Técnicas
              </h3>
              <div className="space-y-4">
                {skills.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} isInView={skillsInView} />
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="neon-card rounded-2xl p-6">
              <h3
                className="text-white font-bold mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.9rem" }}
              >
                <Terminal className="w-4 h-4 text-violet-400" />
                Stack Tecnológico
              </h3>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech, i) => (
                  <motion.span
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={skillsInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.1 + i * 0.04 }}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium border border-white/10 bg-white/5 text-slate-300 hover:border-violet-500/40 hover:text-violet-300 transition-all duration-200"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {tech.name}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
