import { useLocation } from "wouter";
import {
  ArrowLeft,
  AudioLines,
  CalendarDays,
  Clock3,
  Headphones,
  MessageCircle,
  Mic2,
  Play,
  Radio,
  Rss,
  Send,
  Sparkles,
  Volume2,
  Waves,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";

export default function PodcastPage() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();

  const goHome = () => setLocation("/");

  const episodes = [
    {
      status: t("podcast.player.status") || "Nuevo episodio semanal",
      title: "Episodio piloto",
      description: "Tecnología, gaming y el inicio de una comunidad que mezcla código, conversación y cultura gamer.",
      duration: "18 min",
      tone: "Intro",
    },
    {
      status: "En preparación",
      title: "Semana 01: proyectos reales",
      description: "Historias sobre construir productos digitales, aprender creando y compartir el proceso con la comunidad.",
      duration: "25 min",
      tone: "Dev log",
    },
    {
      status: "Mesa abierta",
      title: "Preguntas de la comunidad",
      description: "Un espacio para responder dudas, leer ideas enviadas por seguidores y convertir temas en episodios futuros.",
      duration: "Abierto",
      tone: "Comunidad",
    },
  ];

  const pillars = [
    { icon: Headphones, label: t("podcast.pillar1.label"), text: t("podcast.pillar1.text") },
    { icon: CalendarDays, label: t("podcast.pillar2.label"), text: t("podcast.pillar2.text") },
    { icon: MessageCircle, label: t("podcast.pillar3.label"), text: t("podcast.pillar3.text") },
  ];

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      <Navbar />
      <main className="container mx-auto px-4 py-16 md:py-24">
        <section className="mb-20">
          <div className="mb-8 flex items-center gap-2">
            <button onClick={goHome} className="inline-flex items-center gap-2 rounded-lg border border-violet-400/40 bg-violet-400/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-violet-200 transition hover:bg-violet-400/20">
              <ArrowLeft className="h-3 w-3" />
              {t("podcast.back")}
            </button>
          </div>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="flex flex-col justify-center">
              <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 backdrop-blur-sm">
                <Radio className="h-3 w-3 text-cyan-300" />
                <span className="text-xs font-bold uppercase tracking-widest text-cyan-300">{t("podcast.badge")}</span>
              </div>

              <h1 className="mb-6 text-5xl font-black leading-tight md:text-6xl" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                {t("podcast.title")}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300" style={{ fontFamily: "'Inter', sans-serif" }}>
                {t("podcast.description")}
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="#episodios" className="btn-gold inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-black uppercase tracking-widest">
                  <Play className="h-4 w-4" />
                  {t("podcast.cta")}
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-cyan-500/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/30 bg-[#07111f]/85 p-6 shadow-[0_0_60px_rgba(34,211,238,0.14)] backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">{t("podcast.player.status")}</p>
                    <h2 className="mt-2 text-2xl font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>{t("podcast.player.title")}</h2>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10">
                    <Mic2 className="h-7 w-7 text-cyan-300" />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <button className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-300/10 text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.25)]">
                      <Play className="ml-1 h-6 w-6" />
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">00:00 / --:--</p>
                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                        <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-cyan-300 to-violet-400" />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-16 items-end gap-1 opacity-80">
                    {Array.from({ length: 48 }).map((_, index) => (
                      <span
                        key={index}
                        className="block rounded-full bg-cyan-300/70"
                        style={{ height: `${12 + ((index * 17) % 44)}px` }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <Volume2 className="mx-auto mb-2 h-5 w-5 text-cyan-300" />
                    <p className="text-sm font-bold">Audio</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <Clock3 className="mx-auto mb-2 h-5 w-5 text-violet-300" />
                    <p className="text-sm font-bold">Semanal</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <Rss className="mx-auto mb-2 h-5 w-5 text-amber-300" />
                    <p className="text-sm font-bold">Feed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-20">
          <div className="mb-12">
            <h2 className="mb-2 text-3xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              {t("podcast.section.title")}
            </h2>
            <p className="text-slate-400">{t("podcast.section.subtitle")}</p>
          </div>

          <div className="mb-12 grid gap-6 md:grid-cols-3">
            {episodes.map((ep, i) => (
              <div key={i} className="rounded-lg border border-cyan-400/20 bg-[#0f1620]/50 p-6 backdrop-blur-sm hover:border-cyan-400/40 transition">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-300">
                  {ep.status}
                </div>
                <h3 className="mb-2 text-lg font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                  {ep.title}
                </h3>
                <p className="mb-4 text-sm text-slate-400">{ep.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{ep.duration}</span>
                  <span>{ep.tone}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {pillars.map((pillar, i) => {
              const Icon = pillar.icon;
              return (
                <div key={i} className="rounded-lg border border-violet-400/20 bg-[#0f1620]/50 p-6 backdrop-blur-sm">
                  <Icon className="mb-3 h-6 w-6 text-violet-400" />
                  <h3 className="mb-3 text-xl font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {pillar.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">{pillar.text}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-12 rounded-[2rem] border border-cyan-400/25 bg-[#07111f]/80 p-8 text-center backdrop-blur-xl">
            <Waves className="mx-auto mb-4 h-10 w-10 text-cyan-300" />
            <h2 className="text-3xl font-black" style={{ fontFamily: "'Orbitron', sans-serif" }}>
              {t("podcast.final.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-slate-400">{t("podcast.final.description")}</p>
            <button onClick={goHome} className="mt-8 inline-flex items-center gap-2 rounded-lg border border-violet-400/40 bg-violet-400/10 px-6 py-3 text-sm font-bold uppercase tracking-widest text-violet-200 transition hover:bg-violet-400/20">
              <Sparkles className="h-4 w-4" />
              {t("podcast.back")}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
