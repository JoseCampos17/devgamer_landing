/* =============================================================
   ProcessSection — DevGamer Studio
   Style: Neon Arcade Retro-Futurista
   Work process steps + testimonials
   ============================================================= */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, FileSearch, Code2, Rocket, Star, Quote } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Consulta Inicial",
    description: "Conversamos sobre tu proyecto, objetivos y necesidades para entender exactamente qué construir.",
    color: "#7c3aed",
  },
  {
    number: "02",
    icon: FileSearch,
    title: "Propuesta & Diseño",
    description: "Presento una propuesta detallada con wireframes, tecnologías y cronograma de entrega.",
    color: "#22d3ee",
  },
  {
    number: "03",
    icon: Code2,
    title: "Desarrollo",
    description: "Construyo tu solución con código limpio, iteraciones rápidas y actualizaciones constantes.",
    color: "#f59e0b",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Entrega & Soporte",
    description: "Lanzamos el proyecto y te brindo soporte continuo para garantizar su éxito a largo plazo.",
    color: "#10b981",
  },
];

const testimonials = [
  {
    name: "Carlos M.",
    role: "CEO, TechStartup",
    text: "DevGamer entregó nuestro ERP en tiempo récord. La calidad del código y la atención al detalle son excepcionales. 100% recomendado.",
    rating: 5,
    color: "#7c3aed",
  },
  {
    name: "Ana R.",
    role: "Directora de Marketing",
    text: "La landing page que creó para nuestra campaña aumentó las conversiones en un 340%. Un profesional de primer nivel.",
    rating: 5,
    color: "#22d3ee",
  },
  {
    name: "Luis P.",
    role: "Emprendedor",
    text: "Transformó mi idea en una app funcional en pocas semanas. Comunicación excelente y resultados que superaron mis expectativas.",
    rating: 5,
    color: "#f59e0b",
  },
];

export default function ProcessSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const stepsRef = useRef(null);
  const stepsInView = useInView(stepsRef, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0f1e]" />
      <div className="absolute inset-0 bg-grid opacity-15" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.07)_0%,transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative z-10 container mx-auto max-w-6xl px-4">
        {/* Process */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-4">
            <span
              className="text-cyan-400 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              // proceso
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Cómo <span className="gradient-text">Trabajamos</span>
          </h2>
          <p
            className="text-slate-400 text-base max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Un proceso claro y transparente para que siempre sepas en qué etapa está tu proyecto.
          </p>
        </motion.div>

        {/* Steps */}
        <div ref={stepsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 40 }}
              animate={stepsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative neon-card rounded-2xl p-6 text-center group"
              style={{ borderColor: `${step.color}30` }}
              whileHover={{ y: -6, borderColor: `${step.color}60`, boxShadow: `0 15px 40px ${step.color}20` }}
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-10 -right-2.5 w-5 h-px z-10"
                  style={{ background: `linear-gradient(90deg, ${step.color}60, transparent)` }}
                />
              )}
              {/* Number */}
              <div
                className="text-5xl font-black mb-3 leading-none"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  color: `${step.color}20`,
                  WebkitTextStroke: `1px ${step.color}40`,
                }}
              >
                {step.number}
              </div>
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center"
                style={{ background: `${step.color}15`, border: `1px solid ${step.color}40` }}
              >
                <step.icon className="w-6 h-6" style={{ color: step.color }} />
              </div>
              <h3
                className="text-white font-bold mb-2"
                style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "0.85rem" }}
              >
                {step.title}
              </h3>
              <p
                className="text-slate-400 text-sm leading-relaxed"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={stepsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="text-center mb-10"
        >
          <h3
            className="text-2xl sm:text-3xl font-bold text-white"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Lo Que Dicen <span className="gradient-text">los Clientes</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={stepsInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="neon-card rounded-2xl p-6 relative"
              style={{ borderColor: `${t.color}25` }}
            >
              <Quote
                className="w-8 h-8 mb-3 opacity-30"
                style={{ color: t.color }}
              />
              <p
                className="text-slate-300 text-sm leading-relaxed mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                "{t.text}"
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${t.color}, ${t.color}80)` }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <p
                    className="text-white text-sm font-semibold"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {t.name}
                  </p>
                  <p
                    className="text-slate-500 text-xs"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
