/* =============================================================
   ContactSection — DevGamer Studio
   Style: Neon Arcade Retro-Futurista
   Contact form with social links and contact info
   ============================================================= */

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, Mail, MessageSquare, Github, Linkedin, Twitter, Instagram, Zap } from "lucide-react";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';
import CountryPhoneInput from "./CountryPhoneInput";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "devgamerpro@proton.me",
    color: "text-violet-400",
    borderColor: "border-violet-500/30",
  },
  {
    icon: MessageSquare,
    label: "TikTok",
    value: "@wildrif",
    color: "text-cyan-400",
    borderColor: "border-cyan-500/30",
  },
];

const socials = [
  { icon: Github, label: "GitHub", href: "#", color: "#e2e8f0" },
  { icon: Linkedin, label: "LinkedIn", href: "#", color: "#0ea5e9" },
  { icon: Twitter, label: "Twitter/X", href: "#", color: "#1d9bf0" },
  { icon: Instagram, label: "Instagram", href: "#", color: "#ec4899" },
];

export default function ContactSection() {
  const titleRef = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" });

  const [status, setStatus] = useState<'idle' | 'loading'>('idle');
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const name = formData.get("name");
    const email = formData.get("email");
    const projectDescription = formData.get("message");

    if (!name || !email || !projectDescription) {
      toast.error("Por favor completa los campos requeridos.");
      return;
    }

    setStatus('loading');

    // Use the keys from the glassdemo project as requested
    const publicKey = "F-FuHzyZ9eM3pbZkY";
    const serviceID = "service_tgj93ub";
    const templateID = "template_3lln4ra";

    emailjs.sendForm(serviceID, templateID, formRef.current, {
      publicKey: publicKey,
    })
      .then(
        () => {
          toast.success("¡Cotización enviada! Me pondré en contacto pronto.");
          setStatus('idle');
          formRef.current?.reset();
          setPhone("");
        },
        (error) => {
          console.error('FAILED...', error.text);
          toast.error("Error al enviar la cotización. Intenta de nuevo.");
          setStatus('idle');
        }
      );
  };

  return (
    <section id="contacto" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#070b14]" />
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.1)_0%,transparent_70%)]" />
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
              // contacto
            </span>
          </div>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Iniciemos Tu <span className="gradient-text">Proyecto</span>
          </h2>
          <p
            className="text-slate-400 text-base max-w-xl mx-auto"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            ¿Tienes una idea? Cuéntame sobre tu proyecto y te respondo en menos de 24 horas con una propuesta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-2 space-y-5"
          >
            <div className="neon-card rounded-2xl p-6 space-y-4">
              <h3
                className="text-white font-bold text-sm mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Información de Contacto
              </h3>
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className={`flex items-start gap-3 p-3 rounded-xl border ${info.borderColor} bg-white/3`}
                >
                  <info.icon className={`w-5 h-5 ${info.color} flex-shrink-0 mt-0.5`} />
                  <div>
                    <p
                      className="text-slate-500 text-xs"
                      style={{ fontFamily: "'JetBrains Mono', monospace" }}
                    >
                      {info.label}
                    </p>
                    <p
                      className="text-white text-sm font-medium"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {info.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Socials — oculto temporalmente */}
            {/* <div className="neon-card rounded-2xl p-6">
              <h3
                className="text-white font-bold text-sm mb-4"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Sígueme
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex items-center gap-2 p-3 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors"
                  >
                    <social.icon className="w-4 h-4" style={{ color: social.color }} />
                    <span
                      className="text-xs text-slate-300"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div> */}
          </motion.div>

          {/* Right: Form */}
          <motion.form
            ref={formRef}
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 40 }}
            animate={titleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-3 neon-card rounded-2xl p-8 space-y-4"
          >
            {/* Name */}
            <div>
              <label
                className="block text-slate-400 text-xs mb-2 uppercase tracking-wide"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Nombre *
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder="Tu nombre"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>

            {/* Email */}
            <div>
              <label
                className="block text-slate-400 text-xs mb-2 uppercase tracking-wide"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Email *
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="tu@email.com"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50"
              />
            </div>

            {/* Phone */}
            <div>
              <label
                className="block text-slate-400 text-xs mb-2 uppercase tracking-wide"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Teléfono
              </label>
              <input type="hidden" name="phone" value={phone} />
              <CountryPhoneInput
                value={phone}
                onChange={setPhone}
                placeholder="1234567890"
              />
            </div>

            {/* Service Type & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-slate-400 text-xs mb-2 uppercase tracking-wide"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Servicio *
                </label>
                <select
                  name="service"
                  required
                  defaultValue="Software a la Medida"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-violet-500/50"
                >
                  <option value="Software a la Medida">Software a la Medida</option>
                  <option value="Landing Page">Landing Page</option>
                  <option value="Web3 & Blockchain">Web3 & Blockchain</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-slate-400 text-xs mb-2 uppercase tracking-wide"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  Presupuesto
                </label>
                <select
                  name="budget"
                  className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-violet-500/50"
                >
                  <option value="">Selecciona</option>
                  <option value="$100 - $300">$100 - $300</option>
                  <option value="$300 - $500">$300 - $500</option>
                  <option value="$500 - $1000">$500 - $1000</option>
                  <option value="$1000+">$1000+</option>
                </select>
              </div>
            </div>

            {/* Timeline */}
            <div>
              <label
                className="block text-slate-400 text-xs mb-2 uppercase tracking-wide"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Timeline
              </label>
              <select
                name="timeline"
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-white focus:outline-none focus:border-violet-500/50"
              >
                <option value="">Selecciona</option>
                <option value="Urgente">Urgente</option>
                <option value="1-2 semanas">1-2 semanas</option>
                <option value="1 mes">1 mes</option>
                <option value="Flexible">Flexible</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label
                className="block text-slate-400 text-xs mb-2 uppercase tracking-wide"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                Descripción del Proyecto *
              </label>
              <textarea
                name="message"
                required
                placeholder="Cuéntame sobre tu proyecto..."
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-violet-500/50 resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-gold px-8 py-3.5 rounded-md text-sm font-bold flex items-center justify-center gap-2 w-full disabled:opacity-50 mt-4"
            >
              <Send className="w-4 h-4" />
              {status === 'loading' ? "Enviando..." : "Enviar Cotización"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
