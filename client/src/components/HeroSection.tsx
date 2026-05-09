/* =============================================================
   HeroSection — DevGamer Studio
   Style: Neon Arcade Retro-Futurista
   Full-screen hero with typewriter, neon stats, CTA buttons
   ============================================================= */

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Zap, Star, Users, Code2, Gamepad2, Monitor } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663640454573/2EqbNsmqhN6YUGgqanCV2e/hero-main-Jn9DJpSE74FtKR5wEcvUVH.webp";

export default function HeroSection() {
  const { t, language } = useLanguage();
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeoutRef = useRef<any>(null);

  const typewriterTexts = [
    t("hero.subtitle"),
    "Landing Pages Premium",
    t("hero.title3"),
    "Soluciones Digitales",
  ];

  const stats = [
    { value: "50+", labelKey: "hero.stat1", icon: Code2, color: "text-violet-400" },
    { value: "30+", labelKey: "hero.stat2", icon: Users, color: "text-cyan-400" },
    { value: "5★", label: "Rating", icon: Star, color: "text-amber-400" },
    { value: "24/7", label: "Support", icon: Zap, color: "text-emerald-400" },
  ];

  useEffect(() => {
    const current = typewriterTexts[textIndex];
    const speed = isDeleting ? 40 : 80;

    timeoutRef.current = window.setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(current.slice(0, charIndex + 1));
        if (charIndex + 1 === current.length) {
          timeoutRef.current = window.setTimeout(() => setIsDeleting(true), 2000);
        } else {
          setCharIndex((c) => c + 1);
        }
      } else {
        setDisplayText(current.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setCharIndex(0);
          setTextIndex((i) => (i + 1) % typewriterTexts.length);
        } else {
          setCharIndex((c) => c - 1);
        }
      }
    }, speed);

    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [charIndex, isDeleting, textIndex, typewriterTexts]);

  const scrollToServices = () => {
    document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden scanlines"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#070b14]/70 via-[#070b14]/50 to-[#070b14]" />
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-30" />
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.15)_0%,transparent_70%)]" />

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-6xl px-4 text-center flex flex-col items-center justify-center min-h-screen">
        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-tight mb-4 mt-20"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {t("hero.title1")}
          <br />
          <span className="gradient-text">{t("hero.title2")}</span>
          <br />
          {t("hero.title3")}
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="h-10 flex items-center justify-center mb-8 mt-4"
        >
          <span
            className="text-lg sm:text-2xl text-slate-300 font-medium"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {displayText}
            <span className="cursor-blink text-violet-400">|</span>
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {t("hero.description")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-gold px-8 py-3.5 rounded-md text-sm font-bold flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Zap className="w-4 h-4" />
            {t("hero.cta1")}
          </button>
          <button
            onClick={() => document.getElementById("portafolio")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-neon px-8 py-3.5 rounded-md text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            <Code2 className="w-4 h-4" />
            {t("hero.cta2")}
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.labelKey || stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 + i * 0.1 }}
              className="neon-card rounded-xl p-4 pixel-corner"
            >
              <div className="flex flex-col items-center gap-2">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <span
                  className="text-xl sm:text-2xl font-black text-white"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-xs text-slate-400 text-center"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {stat.labelKey ? t(stat.labelKey) : stat.label}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          onClick={scrollToServices}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-400 hover:text-white transition-colors"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.button>
      </div>
    </section>
  );
}
