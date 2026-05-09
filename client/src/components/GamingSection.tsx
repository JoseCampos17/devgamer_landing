/* =============================================================
   GamingSection — DevGamer Studio
   Style: Neon Arcade Retro-Futurista
   Gaming/streaming section with TikTok streams
   ============================================================= */

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Twitch, Users, Clock, Star, Play, Wifi } from "lucide-react";

const GAMING_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663640454573/2EqbNsmqhN6YUGgqanCV2e/services-gaming-YMfQFx3rYEgt5EnkAitnNa.png";

const platforms = [
  {
    name: "TikTok",
    icon: Twitch,
    color: "#25f4ee",
    handle: "@wildrif",
    followers: "Comenzando",
    description: "Directos de gaming en vivo — ¡Recién iniciado!",
  },
];

const streamStats = [
  { value: "Día 1", label: "En el aire", icon: Play, color: "text-violet-400" },
  { value: "Creciendo", label: "Comunidad", icon: Users, color: "text-cyan-400" },
  { value: "Varias", label: "Horas vivas", icon: Clock, color: "text-amber-400" },
  { value: "🔥", label: "Energía", icon: Star, color: "text-emerald-400" },
];

export default function GamingSection() {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });
  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, margin: "-80px" });

  return (
    <section id="gaming" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#070b14]" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(245,158,11,0.08)_0%,transparent_60%)]" />
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 mb-4">
            <Play className="w-3.5 h-3.5 text-amber-400" />
            <span
              className="text-amber-400 text-xs tracking-widest uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              // gaming & streams
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Directos de <span className="text-amber-400">Gaming</span>
          </h2>
          <p
            className="text-slate-400 text-base max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Cuando no estoy escribiendo código, estoy en vivo jugando con la comunidad.
            ¡Únete a los streams y pásala increíble!
          </p>
        </motion.div>

        {/* Main content: image + platforms */}
        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Stream preview */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-amber-500/30 animate-pulse-glow">
              <img
                src={GAMING_IMG}
                alt="Gaming Setup"
                className="w-full h-72 lg:h-96 object-cover"
              />
              {/* Live badge overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-600/90 backdrop-blur-sm border border-red-500/50">
                <Wifi className="w-3 h-3 text-white animate-pulse" />
                <span className="text-white text-xs font-bold" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                  EN VIVO
                </span>
              </div>
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070b14]/80 via-transparent to-transparent" />
              {/* Bottom info */}
              <div className="absolute bottom-4 left-4 right-4">
                <p
                  className="text-white font-bold text-sm mb-1"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  DevGamer Studio
                </p>
                <p
                  className="text-amber-300 text-xs"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Jugando con la comunidad — ¡Únete!
                </p>
              </div>
            </div>

            {/* Platforms */}
            <div className="grid grid-cols-1 gap-3 mt-4">
              {platforms.map((platform) => (
                <div
                  key={platform.name}
                  className="neon-card rounded-xl p-4 flex flex-col gap-2"
                  style={{ borderColor: `${platform.color}30` }}
                >
                  <div className="flex items-center gap-2">
                    <platform.icon className="w-5 h-5" style={{ color: platform.color }} />
                    <span
                      className="text-white font-bold text-sm"
                      style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem" }}
                    >
                      {platform.name}
                    </span>
                  </div>
                  <p
                    className="text-xs"
                    style={{ color: platform.color, fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {platform.handle}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 text-xs" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {platform.description}
                    </span>
                  </div>
                  <div
                    className="text-lg font-black"
                    style={{ color: platform.color, fontFamily: "'Inter', sans-serif" }}
                  >
                    {platform.followers}
                    <span className="text-slate-500 text-xs font-normal ml-1">seguidores</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Stream stats */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={contentInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex flex-col gap-6"
          >
            {/* Stream stats */}
            <div className="grid grid-cols-2 gap-3">
              {streamStats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={contentInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="neon-card rounded-xl p-4 text-center"
                >
                  <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
                  <div
                    className={`text-xl font-black ${stat.color}`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-slate-500 text-xs mt-0.5"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={() => window.open("https://tiktok.com/@wildrif", "_blank")}
              className="btn-gold px-6 py-3.5 rounded-md text-sm font-bold flex items-center justify-center gap-2 w-full"
            >
              <Play className="w-4 h-4" />
              Seguir en TikTok
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
