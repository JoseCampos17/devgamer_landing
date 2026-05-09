/* =============================================================
   ChatBot — DevGamer Studio
   Style: Neon Arcade Retro-Futurista
   Floating chatbot with predefined options
   ============================================================= */

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

const botResponses: Record<string, string> = {
  "¿Qué servicios ofreces?":
    "Ofrezco tres servicios principales: Software a la medida (web apps, APIs, sistemas), Landing pages de alta conversión, y Web3 & Blockchain (contratos inteligentes, dApps). ¿Cuál te interesa?",
  "¿Cuánto cuesta un proyecto?":
    "Las landing pages van desde $100 a $1000 dependiendo de complejidad y diseño. Software a la medida desde $150 en adelante según lo que necesites. Web3 y blockchain tienen presupuesto personalizado. Cuéntame tu proyecto y te doy el presupuesto exacto.",
  "¿Cuál es el tiempo de entrega?":
    "Depende de la complejidad. Landing pages: 1-2 semanas. Software: 2-8 semanas. Pero siempre trato de ser lo más rápido posible sin sacrificar calidad.",
  "¿Cómo contrato tus servicios?":
    "Completa el formulario de cotización en la sección Contacto, y me pondré en contacto en menos de 24h. También puedes seguirme en TikTok @wildrif.",
  "¿Trabajas con startups?":
    "Claro que sí. Trabajo con startups, emprendedores y empresas. Tengo planes flexibles para todos los presupuestos y realidades.",
  "¿Qué tecnologías usas?":
    "React, Node.js, TypeScript, PostgreSQL, Docker, Stripe, y más. Siempre las mejores herramientas para tu proyecto específico.",
};

const quickOptions = [
  "¿Qué servicios ofreces?",
  "¿Cuánto cuesta un proyecto?",
  "¿Cuál es el tiempo de entrega?",
  "¿Cómo contrato tus servicios?",
  "¿Trabajas con startups?",
  "¿Qué tecnologías usas?",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: string; text: string }>>([
    {
      role: "bot",
      text: "Hola, soy el asistente de DevGamer Studio. ¿En qué puedo ayudarte?",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleQuickOption = (option: string) => {
    setMessages((prev) => [
      ...prev,
      { role: "user", text: option },
      { role: "bot", text: botResponses[option] || "Excelente pregunta. Contáctame para más detalles." },
    ]);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 shadow-lg flex items-center justify-center text-white hover:scale-110 transition-transform"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-40 w-80 bg-[#0a0f1e] border border-violet-500/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600/20 to-cyan-600/20 border-b border-violet-500/20 p-4">
              <h3
                className="text-white font-bold text-sm"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                DevGamer Assistant
              </h3>
              <p
                className="text-slate-400 text-xs"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Respuestas instantáneas
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      msg.role === "user"
                        ? "bg-violet-600/40 text-white"
                        : "bg-slate-700/40 text-slate-200"
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Options */}
            <div className="border-t border-violet-500/20 p-3 space-y-2 max-h-40 overflow-y-auto">
              {quickOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleQuickOption(option)}
                  className="w-full text-left px-3 py-2 rounded-lg bg-slate-700/30 hover:bg-violet-600/30 text-slate-300 hover:text-violet-300 text-xs transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="border-t border-violet-500/20 p-3 bg-slate-800/30">
              <button
                onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
                className="w-full px-3 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-600 text-white text-xs font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Send className="w-3 h-3" />
                Cotizar Proyecto
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
