/* =============================================================
   Navbar — DevGamer Studio
   Style: Neon Arcade Retro-Futurista
   Sticky top nav with glassmorphism, neon accent, mobile menu
   ============================================================= */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Gamepad2, Code2, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const navLinksKeys = [
  { labelKey: "nav.inicio", href: "#hero" },
  { labelKey: "nav.servicios", href: "#servicios" },
  { labelKey: "nav.portafolio", href: "#portafolio" },
  { labelKey: "nav.gaming", href: "#gaming" },
  { labelKey: "nav.sobre-mi", href: "#sobre-mi" },
  { labelKey: "nav.contacto", href: "#contacto" },
];

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#070b14]/95 backdrop-blur-md border-b border-white/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20" role="navigation">
            {/* Logo */}
            <button
              onClick={() => handleNavClick("#hero")}
              className="flex items-center gap-2 group"
              aria-label="Ir al inicio"
            >
              <div className="relative w-9 h-9 flex items-center justify-center">
                <div className="absolute inset-0 bg-violet-600/20 rounded-lg border border-violet-500/40 group-hover:border-cyan-400/60 transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.3)]" />
                <Gamepad2 className="w-5 h-5 text-cyan-400 relative z-10" />
              </div>
              <div className="flex flex-col leading-none">
                <span
                  className="font-bold text-white tracking-wide text-sm"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Dev<span className="text-violet-400">Gamer</span>
                </span>
                <span
                  className="text-slate-500 text-[9px] tracking-wide"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Studio
                </span>
              </div>
            </button>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1" role="menubar">
              {navLinksKeys.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="relative px-4 py-2 text-sm text-slate-300 hover:text-white transition-colors duration-200 group"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  role="menuitem"
                  aria-label={`Ir a ${t(link.labelKey)}`}
                >
                  <span className="relative z-10">{t(link.labelKey)}</span>
                  <span className="absolute inset-0 rounded-md bg-violet-600/0 group-hover:bg-violet-600/10 transition-all duration-200" />
                  <span className="absolute bottom-1 left-4 right-4 h-px bg-gradient-to-r from-violet-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>
              ))}
            </div>

            {/* Language Selector + CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="hidden sm:flex items-center gap-1 px-3 py-2 rounded-md border border-violet-500/30 text-slate-300 hover:text-white hover:border-violet-400/60 transition-all duration-200 text-xs font-medium"
                  aria-label="Cambiar idioma"
                  aria-expanded={langMenuOpen}
                  aria-haspopup="true"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {language.toUpperCase()}
                </button>
                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 bg-[#070b14] border border-violet-500/30 rounded-md overflow-hidden z-50"
                      role="menu"
                    >
                      <button
                        onClick={() => {
                          setLanguage("es");
                          setLangMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                          language === "es"
                            ? "bg-violet-600/20 text-violet-300"
                            : "text-slate-300 hover:text-white hover:bg-violet-600/10"
                        }`}
                        role="menuitem"
                      >
                        Español
                      </button>
                      <button
                        onClick={() => {
                          setLanguage("en");
                          setLangMenuOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-2 text-xs font-medium transition-colors ${
                          language === "en"
                            ? "bg-violet-600/20 text-violet-300"
                            : "text-slate-300 hover:text-white hover:bg-violet-600/10"
                        }`}
                        role="menuitem"
                      >
                        English
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={() => handleNavClick("#contacto")}
                className="hidden sm:flex items-center gap-2 px-5 py-2 rounded-md btn-gold text-xs font-bold"
                aria-label="Cotizar un proyecto"
              >
                <Code2 className="w-3.5 h-3.5" />
                {t("nav.cotizar")}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 rounded-md border border-violet-500/30 text-slate-300 hover:text-white hover:border-violet-400/60 transition-all duration-200"
                aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#070b14]/95 backdrop-blur-xl border-b border-violet-500/20 lg:hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinksKeys.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-violet-600/10 rounded-md transition-all duration-200 border border-transparent hover:border-violet-500/20"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {t(link.labelKey)}
                </motion.button>
              ))}
              <button
                onClick={() => handleNavClick("#contacto")}
                className="mt-2 px-5 py-3 rounded-md btn-gold text-xs font-bold"
              >
                {t("nav.cotizar")}
              </button>
              <button
                onClick={() => {
                  setLanguage(language === "es" ? "en" : "es");
                  setMobileOpen(false);
                }}
                className="mt-2 px-5 py-3 rounded-md border border-violet-500/30 text-slate-300 hover:text-white text-xs font-bold w-full flex items-center justify-center gap-2"
              >
                <Globe className="w-3.5 h-3.5" />
                {language === "es" ? "English" : "Español"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
