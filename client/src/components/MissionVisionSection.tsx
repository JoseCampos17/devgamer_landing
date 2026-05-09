/* =============================================================
   MissionVisionSection — DevGamer Studio
   Style: Neon Arcade Retro-Futurista
   Mission and Vision section
   ============================================================= */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Rocket, Zap } from "lucide-react";

export default function MissionVisionSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, margin: "-80px" });

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#070b14]" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)]" />
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
            <Zap className="w-3.5 h-3.5 text-violet-400" />
            <span
              className="text-violet-400 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              // quiénes somos
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Misión y <span className="gradient-text">Visión</span>
          </h2>
          <p
            className="text-slate-400 text-base max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Conoce qué nos impulsa y hacia dónde queremos llegar.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="neon-card rounded-2xl p-8 border border-violet-500/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-violet-600/20 border border-violet-500/30 flex items-center justify-center">
                <Target className="w-6 h-6 text-violet-400" />
              </div>
              <h3
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Misión
              </h3>
            </div>

            <p
              className="text-slate-300 leading-relaxed mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Crear soluciones digitales de alta calidad que transformen ideas en realidad. Nos dedicamos a desarrollar software personalizado, landing pages de conversión y experiencias digitales que generan impacto real en los negocios de nuestros clientes.
            </p>

            <p
              className="text-slate-400 text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Creemos en la excelencia, la innovación y la pasión por lo que hacemos. Cada proyecto es una oportunidad para crear algo extraordinario.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="neon-card rounded-2xl p-8 border border-cyan-500/30"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-lg bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center">
                <Rocket className="w-6 h-6 text-cyan-400" />
              </div>
              <h3
                className="text-2xl font-bold text-white"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Visión
              </h3>
            </div>

            <p
              className="text-slate-300 leading-relaxed mb-4"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Ser el referente en soluciones digitales personalizadas para emprendedores y empresas que buscan crecer en el mundo digital. Queremos ser conocidos por nuestra dedicación, calidad y capacidad de entregar resultados que superan expectativas.
            </p>

            <p
              className="text-slate-400 text-sm"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Nuestro objetivo es construir relaciones duraderas con nuestros clientes y ser parte de su éxito.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
