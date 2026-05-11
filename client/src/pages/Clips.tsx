import { motion } from "framer-motion";
import { useLocation } from "wouter";
import {
  ArrowLeft,
  Camera,
  Clapperboard,
  Clock,
  Crosshair,
  Flame,
  Gamepad2,
  Play,
  RadioTower,
  Share2,
  Sparkles,
  Swords,
  Trophy,
  Zap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";


const clipCards = [
  {
    tag: "Clip destacado",
    title: "Mejor jugada de la semana",
    description: "Highlights competitivos, clutch moments y jugadas rápidas para enganchar desde el primer segundo.",
    duration: "00:45",
    accent: "#f59e0b",
    icon: Trophy,
  },
  {
    tag: "Nuevo formato",
    title: "Momentos épicos",
    description: "Reacciones, partidas intensas y clips cortos con energía para compartir en redes.",
    duration: "01:10",
    accent: "#7c3aed",
    icon: Flame,
  },
  {
    tag: "Próximamente",
    title: "Clips de comunidad",
    description: "Espacio preparado para contenido enviado por seguidores, retos y momentos favoritos.",
    duration: "Semanal",
    accent: "#22d3ee",
    icon: Swords,
  },
  {
    tag: "Shorts",
    title: "Reacciones rápidas",
    description: "Formato vertical o compacto para piezas cortas que puedan moverse entre plataformas.",
    duration: "00:30",
    accent: "#10b981",
    icon: Zap,
  },
];

const categories = ["Highlights", "Reacciones", "Comunidad", "Shorts", "Retos", "Semanal"];

export default function ClipsPage() {
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  const goHome = () => {
    setLocation("/");
    window.setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
  };

  return (
    <div className="min-h-screen bg-[#060608] text-white overflow-x-hidden">
      <Navbar />

      <main className="relative pt-24">
        <section className="relative min-h-[92vh] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(245,158,11,0.22),transparent_30%),radial-gradient(circle_at_80%_28%,rgba(124,58,237,0.30),transparent_34%),linear-gradient(135deg,#060608_0%,#120b1d_42%,#241106_100%)]" />
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />

          <div className="relative z-10 container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <button
              onClick={goHome}
              className="mb-10 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-amber-300 transition hover:border-amber-300/70 hover:bg-amber-400/15"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al hub
            </button>

            <div className="grid items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
              <motion.div initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2">
                  <Gamepad2 className="h-4 w-4 text-amber-300" />
                  <span className="text-xs uppercase tracking-[0.24em] text-amber-300" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    DevGamer Clip Arena
                  </span>
                </div>

                <h1 className="max-w-4xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  Clips gamer con una web propia para <span className="text-amber-300">momentos rápidos</span>.
                </h1>

                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Esta mini-web está pensada como una vitrina de jugadas, reacciones y clips semanales. La experiencia visual cambia para sentirse más dinámica, intensa y orientada a contenido gamer.
                </p>

                <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                  <a href="#biblioteca" className="btn-gold inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-black uppercase tracking-widest">
                    <Clapperboard className="h-4 w-4" />
                    Ver biblioteca
                  </a>
                  <a href="#formatos" className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-400/40 bg-amber-400/10 px-6 py-3 text-sm font-bold uppercase tracking-widest text-amber-200 transition hover:bg-amber-400/20">
                    <Share2 className="h-4 w-4" />
                    Formatos
                  </a>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.75, delay: 0.15 }} className="relative">
                <div className="absolute -inset-5 rounded-[2rem] bg-amber-500/20 blur-3xl" />
                <div className="relative overflow-hidden rounded-[2rem] border border-amber-400/30 bg-[#0e0d14]/90 p-4 shadow-[0_0_70px_rgba(245,158,11,0.16)] backdrop-blur-xl">
                  <div className="relative aspect-video overflow-hidden rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.24),transparent_35%),linear-gradient(135deg,rgba(124,58,237,0.28),rgba(34,211,238,0.12))]">
                    <div className="absolute left-4 top-4 rounded-full border border-amber-300/40 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-amber-200">Clip destacado</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <button className="flex h-24 w-24 items-center justify-center rounded-full border border-amber-300/60 bg-amber-300/10 text-amber-200 shadow-[0_0_35px_rgba(245,158,11,0.30)]">
                        <Play className="ml-1 h-10 w-10" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-amber-200">Semana actual</p>
                        <h2 className="mt-2 text-2xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>Arena Highlights</h2>
                      </div>
                      <span className="rounded-lg bg-black/55 px-3 py-1 text-xs text-white">00:45</span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    {[Crosshair, Camera, RadioTower].map((Icon, index) => (
                      <div key={index} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                        <Icon className="mx-auto mb-2 h-5 w-5 text-amber-300" />
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-300">{index === 0 ? "Focus" : index === 1 ? "Clips" : "Live"}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="biblioteca" className="relative py-24">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#060608_0%,#100c18_100%)]" />
          <div className="relative z-10 container mx-auto max-w-7xl px-4">
            <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5">
                  <Clapperboard className="h-4 w-4 text-amber-300" />
                  <span className="text-xs uppercase tracking-[0.22em] text-amber-300">Biblioteca gamer</span>
                </div>
                <h2 className="max-w-3xl text-4xl font-black sm:text-5xl" style={{ fontFamily: "'Orbitron', sans-serif" }}>Contenido preparado para publicarse por semanas</h2>
              </div>
              <p className="max-w-xl text-slate-400">Las tarjetas funcionan como placeholders reales: cuando tengas clips, se actualizan título, duración, miniatura o enlace sin cambiar el diseño de la mini-web.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {clipCards.map((clip, index) => (
                <motion.article
                  key={clip.title}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group grid overflow-hidden rounded-3xl border bg-white/[0.035] transition hover:-translate-y-1 md:grid-cols-[180px_1fr]"
                  style={{ borderColor: `${clip.accent}45` }}
                >
                  <div className="relative min-h-[180px]" style={{ background: `radial-gradient(circle at center, ${clip.accent}44, transparent 55%), linear-gradient(135deg, #111827, #060608)` }}>
                    <div className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.18em]" style={{ color: clip.accent }}>{clip.tag}</div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border bg-black/35" style={{ borderColor: `${clip.accent}88`, color: clip.accent }}>
                        <clip.icon className="h-8 w-8" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 right-4 rounded-md bg-black/60 px-2 py-1 text-xs text-white">{clip.duration}</div>
                  </div>
                  <div className="p-6">
                    <p className="mb-3 text-xs uppercase tracking-[0.2em]" style={{ color: clip.accent }}>Clip semanal</p>
                    <h3 className="mb-3 text-2xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>{clip.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-400">{clip.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="formatos" className="relative overflow-hidden py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15),transparent_45%)]" />
          <div className="relative z-10 container mx-auto max-w-6xl px-4">
            <div className="rounded-[2rem] border border-amber-400/25 bg-[#100c18]/80 p-8 backdrop-blur-xl">
              <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <Sparkles className="mb-5 h-10 w-10 text-amber-300" />
                  <h2 className="text-3xl font-black sm:text-4xl" style={{ fontFamily: "'Orbitron', sans-serif" }}>Un espacio propio para clips, retos y momentos virales.</h2>
                  <p className="mt-4 text-slate-400">Clips Gamer queda separado de servicios y del podcast para sentirse como una arena visual dentro de DevGamer.</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {categories.map((category) => (
                    <span key={category} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-bold text-slate-300">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
              <button onClick={goHome} className="mt-10 inline-flex items-center gap-2 rounded-lg border border-violet-400/40 bg-violet-400/10 px-6 py-3 text-sm font-bold uppercase tracking-widest text-violet-200 transition hover:bg-violet-400/20">
                <ArrowLeft className="h-4 w-4" />
                Volver a DevGamer Hub
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
