/* =============================================================
   ServicesSection — DevGamer Studio
   Style: Neon Arcade Retro-Futurista
   Three service cards with hover glow and feature lists
   ============================================================= */

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

import {
  Code2, Layout, Gamepad2, CheckCircle2, ArrowRight,
  Database, Smartphone, Globe, Twitch, Youtube, Mic, Zap
} from "lucide-react";

const SOFTWARE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663640454573/2EqbNsmqhN6YUGgqanCV2e/services-software-DyykzFmyfouAKjQiPsxcY5.png";
const LANDING_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663640454573/2EqbNsmqhN6YUGgqanCV2e/services-landing-AATKYGyMGWd7jfus8xUJhw.png";
const GAMING_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663640454573/2EqbNsmqhN6YUGgqanCV2e/services-gaming-YMfQFx3rYEgt5EnkAitnNa.png";
const WEB3_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663640454573/2EqbNsmqhN6YUGgqanCV2e/services-gaming-YMfQFx3rYEgt5EnkAitnNa.png";

const services = [
  {
    id: "software",
    icon: Code2,
    title: "Software a la Medida",
    subtitle: "Soluciones 100% personalizadas",
    description:
      "Desarrollo aplicaciones web, sistemas de gestión, APIs y herramientas digitales adaptadas exactamente a tus necesidades de negocio.",
    image: SOFTWARE_IMG,
    color: "violet",
    borderColor: "rgba(124,58,237,0.5)",
    glowColor: "rgba(124,58,237,0.3)",
    accentColor: "#7c3aed",
    features: [
      { icon: Globe, text: "Aplicaciones Web Full-Stack" },
      { icon: Database, text: "APIs REST & Bases de Datos" },
      { icon: Smartphone, text: "Apps Responsivas & PWA" },
      { icon: Code2, text: "Automatizaciones & Bots" },
    ],
    badge: "DESARROLLO",
  },
  {
    id: "landing",
    icon: Layout,
    title: "Landing Pages",
    subtitle: "Diseño que convierte visitas en clientes",
    description:
      "Creo landing pages de alta conversión con diseño premium, animaciones fluidas y optimización SEO para maximizar tus resultados.",
    image: LANDING_IMG,
    color: "cyan",
    borderColor: "rgba(34,211,238,0.5)",
    glowColor: "rgba(34,211,238,0.3)",
    accentColor: "#22d3ee",
    features: [
      { icon: Layout, text: "Diseño UI/UX Moderno" },
      { icon: Globe, text: "SEO Optimizado" },
      { icon: Smartphone, text: "100% Responsive" },
      { icon: CheckCircle2, text: "Alta Tasa de Conversión" },
    ],
    badge: "DISEÑO WEB",
  },
  {
    id: "web3",
    icon: Zap,
    title: "Web3 & Blockchain",
    subtitle: "Contratos inteligentes y dApps",
    description:
      "Desarrollo soluciones blockchain, contratos inteligentes en Solidity y aplicaciones descentralizadas con tecnología Web3.",
    image: WEB3_IMG,
    color: "emerald",
    borderColor: "rgba(16,185,129,0.5)",
    glowColor: "rgba(16,185,129,0.3)",
    accentColor: "#10b981",
    features: [
      { icon: Code2, text: "Contratos Inteligentes (Solidity)" },
      { icon: Globe, text: "DApps Descentralizadas" },
      { icon: Database, text: "Integración Blockchain" },
      { icon: Zap, text: "Smart Contract Auditoría" },
    ],
    badge: "WEB3",
  },
];

const colorMap: Record<string, string> = {
  violet: "text-violet-400",
  cyan: "text-cyan-400",
  gold: "text-amber-400",
  emerald: "text-emerald-400",
};

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      className="group relative rounded-2xl overflow-hidden cursor-default"
      style={{
        background: "rgba(13, 21, 38, 0.85)",
        border: `1px solid ${service.borderColor}`,
        backdropFilter: "blur(12px)",
      }}
      whileHover={{
        y: -8,
        boxShadow: `0 20px 60px ${service.glowColor}, 0 0 30px ${service.glowColor}`,
        borderColor: service.accentColor,
      }}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 30%, rgba(13,21,38,0.95) 100%)`,
          }}
        />
        {/* Badge */}
        <div
          className="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            background: `${service.accentColor}22`,
            border: `1px solid ${service.accentColor}66`,
            color: service.accentColor,
          }}
        >
          {service.badge}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ background: `${service.accentColor}15`, border: `1px solid ${service.accentColor}40` }}
          >
            <service.icon className={`w-5 h-5 ${colorMap[service.color]}`} />
          </div>
          <div>
            <h3
              className="text-white font-bold text-lg leading-tight"
              style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "1rem" }}
            >
              {service.title}
            </h3>
            <p className="text-slate-500 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              {service.subtitle}
            </p>
          </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-5" style={{ fontFamily: "'Inter', sans-serif" }}>
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {service.features.map((feat) => (
            <li key={feat.text} className="flex items-center gap-2.5">
              <feat.icon className={`w-3.5 h-3.5 ${colorMap[service.color]} flex-shrink-0`} />
              <span className="text-slate-300 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                {feat.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-all duration-300 group/btn"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            background: `${service.accentColor}15`,
            border: `1px solid ${service.accentColor}40`,
            color: service.accentColor,
            letterSpacing: "0.08em",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = `${service.accentColor}25`;
            (e.currentTarget as HTMLButtonElement).style.borderColor = service.accentColor;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = `${service.accentColor}15`;
            (e.currentTarget as HTMLButtonElement).style.borderColor = `${service.accentColor}40`;
          }}
        >
          Saber más
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/btn:translate-x-1" />
        </button>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const { t } = useLanguage();
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  return (
    <section id="servicios" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#070b14]" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px section-divider" />

      <div className="relative z-10 container mx-auto max-w-6xl px-4">
        {/* Section header */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 mb-4"
          >
            <span
              className="text-violet-400 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              // servicios
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t("services.title")}
          </h2>
          <p
            className="text-slate-400 text-base max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {t("services.subtitle")}
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
