/* =============================================================
   Footer — DevGamer Studio
   Style: Neon Arcade Retro-Futurista
   ============================================================= */

import { motion } from "framer-motion";
import { Gamepad2, Heart, Code2, Linkedin, Github, Twitter } from "lucide-react";

const footerLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Portafolio", href: "#portafolio" },
  { label: "Gaming", href: "#gaming" },
  { label: "Sobre mí", href: "#sobre-mi" },
  { label: "Contacto", href: "#contacto" },
];

const socialLinks = [
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/josé-gregorio-campos-murillo/", color: "hover:text-blue-500" },
  { icon: Github, label: "GitHub", href: "#", color: "hover:text-slate-300" },
  { icon: Twitter, label: "Twitter", href: "#", color: "hover:text-cyan-400" },
];

export default function Footer() {
  const handleClick = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-violet-500/20 bg-[#050810]">
      {/* Top gradient line */}
      <div className="h-px w-full section-divider" />

      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-3">
            <button
              onClick={() => handleClick("#hero")}
              className="flex items-center gap-2 group"
            >
              <div className="w-9 h-9 flex items-center justify-center rounded-lg border border-violet-500/40 bg-violet-600/20">
                <Gamepad2 className="w-5 h-5 text-cyan-400" />
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
            <p
              className="text-slate-500 text-sm leading-relaxed max-w-xs"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Software a la medida, landing pages premium, Web3 y directos de gaming. Tu visión, hecha realidad en código.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4
              className="text-slate-400 text-xs tracking-widest uppercase mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Navegación
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleClick(link.href)}
                    className="text-slate-500 hover:text-violet-400 text-sm transition-colors duration-200"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Status */}
          <div>
            <h4
              className="text-slate-400 text-xs tracking-widest uppercase mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Redes Sociales
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-slate-500 ${social.color} transition-colors duration-200`}
                    title={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span
                  className="text-slate-400 text-sm"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Disponible para proyectos
                </span>
              </div>
              <div
                className="mt-3 px-3 py-2 rounded-lg border border-violet-500/20 bg-violet-500/5 text-xs text-slate-500"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Respuesta en &lt; 24h garantizada
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p
            className="text-slate-600 text-xs flex items-center gap-1.5"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            © {new Date().getFullYear()} DevGamer Studio. Hecho con
            <Heart className="w-3 h-3 text-red-500 inline" />
            y mucho café.
          </p>
          <p
            className="text-slate-700 text-xs flex items-center gap-1.5"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            <Code2 className="w-3 h-3" />
            Powered by React + Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
