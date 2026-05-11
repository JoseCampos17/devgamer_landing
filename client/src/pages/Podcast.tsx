import { useLocation } from "wouter";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { toast } from "sonner";
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
  Loader2,
  Youtube,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";


const API_URL = 'https://back.devgamerpro.com';

export default function PodcastPage() {
  const [, setLocation] = useLocation();
  const { t } = useLanguage();
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [featuredEpisode, setFeaturedEpisode] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [episodesRes, latestRes] = await Promise.all([
          axios.get(`${API_URL}/episodes?limit=6`),
          axios.get(`${API_URL}/episodes/latest`)
        ]);
        console.log("Episodios:", episodesRes.data.data);
        console.log("Último episodio:", latestRes.data.data);
        setEpisodes(episodesRes.data.data || []);
        setFeaturedEpisode(latestRes.data.data || null);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Asegurarnos de que el audio se cargue correctamente cuando cambie el episodio
  useEffect(() => {
    if (audioRef.current && featuredEpisode?.audio_url) {
      audioRef.current.load();
    }
  }, [featuredEpisode?.audio_url]);

  const togglePlay = () => {
    if (!audioRef.current || !featuredEpisode?.audio_url) {
      console.warn("No hay audio listo para reproducir");
      return;
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => {
          console.error("Error al reproducir audio:", err);
          toast.error("No se pudo reproducir el audio. Verifica el formato.");
        });
    }
  };

  const goHome = () => setLocation("/");

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

              <div className="mt-10 flex flex-col gap-6">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500">
                  {t("podcast.listen_on_hero")}
                </p>
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="#" 
                    target="_blank" 
                    className="group flex items-center gap-3 rounded-xl border border-[#1DB954]/30 bg-[#1DB954]/10 px-6 py-3.5 transition-all hover:bg-[#1DB954]/25 hover:shadow-[0_0_30px_rgba(29,185,84,0.2)]"
                  >
                    <svg className="h-6 w-6 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.503 17.294c-.216.354-.675.465-1.028.249-2.821-1.722-6.372-2.112-10.554-1.157-.403.092-.806-.16-.898-.562-.092-.403.16-.806.562-.898 4.571-1.045 8.503-.604 11.664 1.328.354.215.465.674.249 1.028zm1.47-3.253c-.272.441-.849.581-1.29.309-3.228-1.983-8.15-2.557-11.967-1.4c-.497.151-1.021-.129-1.171-.626-.151-.497.129-1.021.626-1.171 4.364-1.324 9.791-.68 13.5 1.597.441.272.581.849.309 1.29zm.126-3.41c-3.872-2.3-10.27-2.513-13.996-1.383-.593.18-1.223-.153-1.403-.747-.18-.593.153-1.223.747-1.403 4.288-1.301 11.353-1.044 15.823 1.61.534.317.708 1.008.391 1.542-.317.534-1.008.708-1.542.391z"/>
                    </svg>
                    <span className="text-base font-bold tracking-tight text-white">Spotify</span>
                  </a>

                  <a 
                    href="#" 
                    target="_blank" 
                    className="group flex items-center gap-3 rounded-xl border border-[#FF0000]/30 bg-[#FF0000]/10 px-6 py-3.5 transition-all hover:bg-[#FF0000]/25 hover:shadow-[0_0_30px_rgba(255,0,0,0.2)]"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FF0000] text-white">
                      <Youtube className="h-4 w-4" />
                    </div>
                    <span className="text-base font-bold tracking-tight text-white">YouTube Music</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-6 rounded-[2rem] bg-cyan-500/20 blur-3xl" />
              <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/30 bg-[#07111f]/85 p-6 shadow-[0_0_60px_rgba(34,211,238,0.14)] backdrop-blur-xl">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                      {featuredEpisode?.status || t("podcast.player.status")}
                    </p>
                    <h2 className="mt-2 text-2xl font-bold" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {featuredEpisode?.title || t("podcast.player.title")}
                    </h2>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/40 bg-cyan-400/10">
                    <Mic2 className="h-7 w-7 text-cyan-300" />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-5 flex items-center gap-3">
                    <audio 
                      ref={audioRef} 
                      src={featuredEpisode?.audio_url} 
                      onEnded={() => setIsPlaying(false)}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
                      onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                      onError={() => toast.error("Error al cargar el archivo de audio")}
                    />
                    <button 
                      onClick={togglePlay}
                      className={`flex h-14 w-14 items-center justify-center rounded-full border border-cyan-300/50 bg-cyan-300/10 text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.25)] transition-all hover:scale-105 active:scale-95 ${!featuredEpisode?.audio_url ? 'opacity-50 grayscale cursor-not-allowed' : ''}`}
                    >
                      {isPlaying ? (
                        <Waves className="h-6 w-6 animate-pulse" />
                      ) : (
                        <Play className="ml-1 h-6 w-6" />
                      )}
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-1">
                        {formatTime(currentTime)} / {formatTime(duration || 0)}
                      </p>
                      <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-cyan-300 to-violet-400 transition-all duration-100" 
                          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between gap-[2px] opacity-80 h-24 overflow-hidden">
                    {Array.from({ length: 100 }).map((_, index) => (
                      <span
                        key={index}
                        className={`block w-0.5 sm:w-1 rounded-full bg-cyan-400/30 transition-all duration-300 ${isPlaying ? 'animate-pulse' : ''}`}
                        style={{ 
                          height: isPlaying 
                            ? `${20 + Math.random() * 70}%` 
                            : `${15 + ((index * 13) % 40)}%`,
                          animationDelay: `${index * 0.03}s`,
                          animationDuration: '0.6s'
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/5 pt-8">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
                    {t("podcast.listen_on")}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <a 
                      href="#" 
                      target="_blank" 
                      className="group flex items-center gap-3 rounded-xl border border-[#1DB954]/30 bg-[#1DB954]/5 px-6 py-3 transition-all hover:bg-[#1DB954]/20 hover:shadow-[0_0_20px_rgba(29,185,84,0.15)]"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1DB954] text-black">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zm5.503 17.294c-.216.354-.675.465-1.028.249-2.821-1.722-6.372-2.112-10.554-1.157-.403.092-.806-.16-.898-.562-.092-.403.16-.806.562-.898 4.571-1.045 8.503-.604 11.664 1.328.354.215.465.674.249 1.028zm1.47-3.253c-.272.441-.849.581-1.29.309-3.228-1.983-8.15-2.557-11.967-1.4c-.497.151-1.021-.129-1.171-.626-.151-.497.129-1.021.626-1.171 4.364-1.324 9.791-.68 13.5 1.597.441.272.581.849.309 1.29zm.126-3.41c-3.872-2.3-10.27-2.513-13.996-1.383-.593.18-1.223-.153-1.403-.747-.18-.593.153-1.223.747-1.403 4.288-1.301 11.353-1.044 15.823 1.61.534.317.708 1.008.391 1.542-.317.534-1.008.708-1.542.391z"/>
                        </svg>
                      </div>
                      <span className="text-sm font-bold tracking-tight text-white group-hover:text-[#1DB954]">Spotify</span>
                    </a>

                    <a 
                      href="#" 
                      target="_blank" 
                      className="group flex items-center gap-3 rounded-xl border-[#FF0000]/30 bg-[#FF0000]/5 border px-6 py-3 transition-all hover:bg-[#FF0000]/20 hover:shadow-[0_0_20px_rgba(255,0,0,0.15)]"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF0000] text-white">
                        <Youtube className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-bold tracking-tight text-white group-hover:text-[#FF0000]">YouTube Music</span>
                    </a>
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

          <div className="mb-12 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {loading ? (
              <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-500">
                <Loader2 className="h-10 w-10 animate-spin mb-4 text-cyan-400" />
                <p className="font-bold tracking-widest uppercase text-[10px]">Cargando biblioteca...</p>
              </div>
            ) : episodes.map((ep, i) => (
              <div key={i} className="group relative rounded-xl border border-white/5 bg-[#0f1620]/40 backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-300 overflow-hidden flex flex-col h-full">
                <div className="relative h-40 w-full overflow-hidden">
                  {ep.image_url ? (
                    <img src={ep.image_url} alt={ep.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                      <Mic2 className="h-10 w-10 text-slate-700" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 rounded-full bg-[#070b14]/80 backdrop-blur-md border border-cyan-400/30 text-[9px] font-black uppercase tracking-widest text-cyan-400">
                      {ep.status}
                    </span>
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="mb-2 text-sm font-bold group-hover:text-cyan-300 transition-colors leading-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {ep.title}
                  </h3>
                  <p className="mb-4 text-[11px] text-slate-400 line-clamp-3 leading-relaxed">{ep.description || "Sin descripción."}</p>
                  
                  <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between text-[9px] font-bold uppercase tracking-widest text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Clock3 className="h-2.5 w-2.5 text-violet-400" />
                      <span>{ep.duration || "--"}</span>
                    </div>
                    <div className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-slate-500">
                      {ep.tone || "Podcast"}
                    </div>
                  </div>
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
