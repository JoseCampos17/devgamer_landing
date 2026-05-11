/* =============================================================
   PortfolioSection — DevGamer Studio
   Style: Neon Arcade Retro-Futurista
   Project cards with filter tabs and hover reveal
   ============================================================= */

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, Layout, Globe, Smartphone, Database, Zap } from "lucide-react";

type Category = "todos" | "software" | "landing" | "web";

const projects = [
  {
    id: 1,
    title: "Sistema de Gestión ERP",
    category: "software" as Category,
    description: "ERP personalizado para empresa manufacturera con módulos de inventario, facturación y reportes en tiempo real.",
    tech: ["React", "Node.js", "PostgreSQL", "Redis"],
    icon: Database,
    color: "#7c3aed",
    gradient: "from-violet-600/20 to-purple-900/20",
    border: "border-violet-500/30",
    badge: "SOFTWARE",
    badgeColor: "text-violet-400",
    year: "2024",
  },
  {
    id: 2,
    title: "Landing Page SaaS",
    category: "landing" as Category,
    description: "Landing de alta conversión para startup de SaaS con A/B testing, animaciones y formulario de captura de leads.",
    tech: ["React", "Framer Motion", "Tailwind", "Vercel"],
    icon: Layout,
    color: "#22d3ee",
    gradient: "from-cyan-600/20 to-blue-900/20",
    border: "border-cyan-500/30",
    badge: "LANDING",
    badgeColor: "text-cyan-400",
    year: "2024",
  },
  {
    id: 3,
    title: "Portafolio Fotógrafo",
    category: "landing" as Category,
    description: "Sitio web premium para fotógrafo profesional con galería masonry, modo oscuro y formulario de contacto.",
    tech: ["Next.js", "Tailwind", "Cloudinary", "Resend"],
    icon: Globe,
    color: "#22d3ee",
    gradient: "from-cyan-600/20 to-teal-900/20",
    border: "border-cyan-500/30",
    badge: "LANDING",
    badgeColor: "text-cyan-400",
    year: "2024",
  },
  {
    id: 4,
    title: "API de Pagos",
    category: "software" as Category,
    description: "Microservicio de procesamiento de pagos con integración Stripe, webhooks y dashboard de transacciones.",
    tech: ["Node.js", "Stripe", "TypeScript", "Docker"],
    icon: Zap,
    color: "#f59e0b",
    gradient: "from-amber-600/20 to-orange-900/20",
    border: "border-amber-500/30",
    badge: "API",
    badgeColor: "text-amber-400",
    year: "2023",
  },
];

const filters: { label: string; value: Category }[] = [
  { label: "Todos", value: "todos" },
  { label: "Software", value: "software" },
  { label: "Landing Pages", value: "landing" },
  { label: "Web Apps", value: "web" },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`group relative rounded-xl overflow-hidden bg-gradient-to-br ${project.gradient} border ${project.border} backdrop-blur-sm cursor-default`}
      whileHover={{ y: -6, boxShadow: `0 20px 40px ${project.color}22` }}
    >
      {/* Top accent line */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: `${project.color}15`, border: `1px solid ${project.color}40` }}
            >
              <project.icon className="w-5 h-5" style={{ color: project.color }} />
            </div>
            <div>
              <span
                className={`text-[10px] font-bold tracking-widest ${project.badgeColor}`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {project.badge}
              </span>
              <h3
                className="text-white font-bold text-sm leading-tight"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {project.title}
              </h3>
            </div>
          </div>
          <span
            className="text-slate-600 text-xs flex-shrink-0 ml-2"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {project.year}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-slate-400 text-sm leading-relaxed mb-4"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-[10px] text-slate-400 border border-white/10 bg-white/5"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {t}
            </span>
          ))}
        </div>


      </div>
    </motion.div>
  );
}

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState<Category>("todos");
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const filtered = activeFilter === "todos"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portafolio" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0f1e]" />
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative z-10 container mx-auto max-w-6xl px-4">
        {/* Header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-4">
            <span
              className="text-cyan-400 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              // portafolio
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Proyectos <span className="gradient-text">Destacados</span>
          </h2>
          <p
            className="text-slate-400 text-base max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Una selección de trabajos que demuestran mi capacidad técnica y creatividad en cada proyecto.
          </p>
        </motion.div>

        {/* Filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className="px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300"
              style={{
                fontFamily: "'Orbitron', sans-serif",
                letterSpacing: "0.06em",
                background: activeFilter === f.value ? "rgba(124,58,237,0.3)" : "rgba(255,255,255,0.05)",
                border: activeFilter === f.value ? "1px solid rgba(124,58,237,0.7)" : "1px solid rgba(255,255,255,0.1)",
                color: activeFilter === f.value ? "#c4b5fd" : "#94a3b8",
                boxShadow: activeFilter === f.value ? "0 0 15px rgba(124,58,237,0.3)" : "none",
              }}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={titleInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-gold px-8 py-3.5 rounded-md text-sm font-bold inline-flex items-center gap-2"
          >
            <Zap className="w-4 h-4" />
            Quiero un proyecto así
          </button>
        </motion.div>
      </div>
    </section>
  );
}
