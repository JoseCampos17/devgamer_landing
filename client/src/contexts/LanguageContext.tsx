import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "es" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

export const translations = {
  es: {
    // Navbar
    "nav.inicio": "Inicio",
    "nav.servicios": "Servicios",
    "nav.portafolio": "Portafolio",
    "nav.gaming": "Gaming",
    "nav.sobre-mi": "Sobre mí",
    "nav.contacto": "Contacto",
    "nav.cotizar": "COTIZAR PROYECTO",

    // Hero
    "hero.badge": "Expertos en Desarrollo Web",
    "hero.title1": "Desarrollo de",
    "hero.title2": "Software Premium",
    "hero.title3": "a la Medida",
    "hero.subtitle": "Software House & Landing Pages",
    "hero.description": "Expertos en desarrollo de software a la medida, landing pages de alta conversión y soluciones digitales escalables. Transformamos tu visión en productos tecnológicos de alto impacto.",
    "hero.cta1": "COTIZAR PROYECTO",
    "hero.cta2": "VER PORTAFOLIO",
    "hero.stat1": "Proyectos",
    "hero.stat2": "Clientes",
    "hero.stat3": "Años",

    // Services
    "services.title": "Servicios",
    "services.subtitle": "Soluciones digitales a medida",
    "services.software.title": "Software a la Medida",
    "services.software.subtitle": "Aplicaciones web y APIs",
    "services.software.description": "Desarrollo aplicaciones web escalables, APIs robustas y sistemas personalizados según tus necesidades específicas.",
    "services.software.feature1": "React, Node.js, TypeScript",
    "services.software.feature2": "Bases de Datos Escalables",
    "services.software.feature3": "Integración de Pagos",
    "services.software.feature4": "Hosting y Deployment",
    "services.landing.title": "Landing Pages",
    "services.landing.subtitle": "Diseño de alta conversión",
    "services.landing.description": "Landing pages optimizadas para conversión, con diseño moderno y estrategia de marketing integrada.",
    "services.landing.feature1": "Diseño Responsivo",
    "services.landing.feature2": "Optimización SEO",
    "services.landing.feature3": "Alta Tasa de Conversión",
    "services.web3.title": "Web3 & Blockchain",
    "services.web3.subtitle": "Contratos inteligentes y dApps",
    "services.web3.description": "Desarrollo soluciones blockchain, contratos inteligentes en Solidity y aplicaciones descentralizadas con tecnología Web3.",
    "services.web3.feature1": "Contratos Inteligentes (Solidity)",
    "services.web3.feature2": "DApps Descentralizadas",
    "services.web3.feature3": "Integración Blockchain",
    "services.web3.feature4": "Smart Contract Auditoría",

    // Portfolio
    "portfolio.title": "Portafolio",
    "portfolio.subtitle": "Proyectos destacados",
    "portfolio.view-details": "Ver detalles",

    // Gaming
    "gaming.title": "Gaming",
    "gaming.subtitle": "Directos en TikTok",
    "gaming.description": "Realizo directos de videojuegos en TikTok, creando contenido entretenido y construyendo una comunidad activa.",
    "gaming.platform": "Plataforma",
    "gaming.followers": "Seguidores",
    "gaming.status": "Estado",
    "gaming.follow": "Seguir",
    "gaming.live": "EN VIVO",
    "gaming.offline": "OFFLINE",

    // Mission/Vision
    "mission-vision.mission.title": "Misión",
    "mission-vision.mission.description": "Transformar ideas en soluciones digitales de calidad, accesibles y escalables para emprendedores y empresas en LATAM.",
    "mission-vision.vision.title": "Visión",
    "mission-vision.vision.description": "Ser el desarrollador de confianza para startups y empresas que buscan innovación tecnológica sin comprometer calidad.",

    // Process
    "process.title": "Proceso de Trabajo",
    "process.subtitle": "Cómo trabajamos juntos",
    "process.step1.title": "Consulta",
    "process.step1.description": "Entendemos tu idea y necesidades",
    "process.step2.title": "Propuesta",
    "process.step2.description": "Te presentamos presupuesto y timeline",
    "process.step3.title": "Desarrollo",
    "process.step3.description": "Construimos tu solución con calidad",
    "process.step4.title": "Entrega",
    "process.step4.description": "Lanzamos y damos soporte continuo",
    "process.testimonial1.author": "Cliente 1",
    "process.testimonial1.text": "Excelente trabajo, muy profesional y atento a los detalles.",
    "process.testimonial2.author": "Cliente 2",
    "process.testimonial2.text": "Superó mis expectativas, lo recomiendo ampliamente.",
    "process.testimonial3.author": "Cliente 3",
    "process.testimonial3.text": "Rápido, eficiente y de gran calidad. Perfecto.",

    // About
    "about.title": "Sobre mí",
    "about.subtitle": "Desarrollador Full Stack",
    "about.bio": "Soy José Gregorio, desarrollador full stack especializado en React, Node.js, Python y Solidity. Me apasiona crear soluciones digitales innovadoras y compartir mi amor por los videojuegos.",
    "about.skills": "Habilidades",
    "about.tech-stack": "Stack Tecnológico",
    "about.linkedin": "Ver LinkedIn",

    // Contact
    "contact.title": "Contacto",
    "contact.subtitle": "¿Tienes un proyecto en mente?",
    "contact.email": "Email",
    "contact.tiktok": "TikTok",
    "contact.follow": "Sígueme",
    "contact.form.name": "Nombre",
    "contact.form.email": "Email",
    "contact.form.phone": "Teléfono",
    "contact.form.service": "Servicio",
    "contact.form.description": "Descripción del Proyecto",
    "contact.form.budget": "Presupuesto",
    "contact.form.timeline": "Timeline",
    "contact.form.message": "Mensaje adicional",
    "contact.form.send": "Enviar Cotización",
    "contact.form.success": "¡Cotización enviada! Me pondré en contacto pronto.",
    "contact.form.error": "Error al enviar. Intenta de nuevo.",
    "contact.budget.100-300": "$100 - $300",
    "contact.budget.300-500": "$300 - $500",
    "contact.budget.500-1000": "$500 - $1000",
    "contact.budget.1000+": "$1000+",
    "contact.timeline.urgent": "Urgente",
    "contact.timeline.1-2weeks": "1-2 semanas",
    "contact.timeline.1month": "1 mes",
    "contact.timeline.flexible": "Flexible",

    // Footer
    "footer.brand": "DevGamer Studio",
    "footer.description": "Software a la medida, landing pages premium, Web3 y directos de gaming. Tu visión, hecha realidad en código.",
    "footer.navigation": "Navegación",
    "footer.socials": "Redes Sociales",
    "footer.available": "Disponible para proyectos",
    "footer.response-time": "Respuesta en < 24h garantizada",
    "footer.copyright": "© {year} DevGamer Studio. Hecho con ❤️ y mucho café.",
    "footer.powered": "Powered by React + Framer Motion",

    // ChatBot
    "chatbot.greeting": "¡Hola! 👋 Soy el asistente de DevGamer Studio. ¿En qué puedo ayudarte?",
    "chatbot.q1": "¿Qué servicios ofreces?",
    "chatbot.a1": "Ofrezco tres servicios principales: Software a la medida (web apps, APIs, sistemas), Landing pages de alta conversión, y Web3 & Blockchain (contratos inteligentes, dApps). ¿Cuál te interesa?",
    "chatbot.q2": "¿Cuánto cuesta un proyecto?",
    "chatbot.a2": "Las landing pages van desde $100 a $1000 dependiendo de complejidad y diseño. Software a la medida desde $150 en adelante según lo que necesites. Web3 y blockchain tienen presupuesto personalizado. Cuéntame tu proyecto y te doy el presupuesto exacto.",
    "chatbot.q3": "¿Cuál es el tiempo de entrega?",
    "chatbot.a3": "Depende de la complejidad. Landing pages: 1-2 semanas. Software: 2-8 semanas. Pero siempre trato de ser lo más rápido posible sin sacrificar calidad.",
    "chatbot.q4": "¿Cómo contrato tus servicios?",
    "chatbot.a4": "Completa el formulario de cotización en la sección Contacto, y me pondré en contacto en menos de 24h. También puedes seguirme en TikTok @wildrif.",
    "chatbot.q5": "¿Trabajas con startups?",
    "chatbot.a5": "Claro que sí. Trabajo con startups, emprendedores y empresas. Tengo planes flexibles para todos los presupuestos y realidades.",
    "chatbot.q6": "¿Qué tecnologías usas?",
    "chatbot.a6": "React, Node.js, TypeScript, PostgreSQL, Docker, Stripe, y más. Siempre las mejores herramientas para tu proyecto específico.",
  },
  en: {
    // Navbar
    "nav.inicio": "Home",
    "nav.servicios": "Services",
    "nav.portafolio": "Portfolio",
    "nav.gaming": "Gaming",
    "nav.sobre-mi": "About",
    "nav.contacto": "Contact",
    "nav.cotizar": "QUOTE PROJECT",

    // Hero
    "hero.badge": "Dev + Gaming",
    "hero.title1": "Code that",
    "hero.title2": "Transforms",
    "hero.title3": "ideas",
    "hero.subtitle": "Custom Software",
    "hero.description": "I develop custom digital solutions, high-conversion landing pages and share my passion for video games in unique live streams. All in one place.",
    "hero.cta1": "START PROJECT",
    "hero.cta2": "VIEW WORK",
    "hero.stat1": "Projects",
    "hero.stat2": "Clients",
    "hero.stat3": "Years",

    // Services
    "services.title": "Services",
    "services.subtitle": "Custom digital solutions",
    "services.software.title": "Custom Software",
    "services.software.subtitle": "Web apps and APIs",
    "services.software.description": "I develop scalable web applications, robust APIs and custom systems according to your specific needs.",
    "services.software.feature1": "React, Node.js, TypeScript",
    "services.software.feature2": "Scalable Databases",
    "services.software.feature3": "Payment Integration",
    "services.software.feature4": "Hosting & Deployment",
    "services.landing.title": "Landing Pages",
    "services.landing.subtitle": "High-conversion design",
    "services.landing.description": "Landing pages optimized for conversion, with modern design and integrated marketing strategy.",
    "services.landing.feature1": "Responsive Design",
    "services.landing.feature2": "SEO Optimization",
    "services.landing.feature3": "High Conversion Rate",
    "services.web3.title": "Web3 & Blockchain",
    "services.web3.subtitle": "Smart contracts & dApps",
    "services.web3.description": "I develop blockchain solutions, smart contracts in Solidity and decentralized applications with Web3 technology.",
    "services.web3.feature1": "Smart Contracts (Solidity)",
    "services.web3.feature2": "Decentralized dApps",
    "services.web3.feature3": "Blockchain Integration",
    "services.web3.feature4": "Smart Contract Audit",

    // Portfolio
    "portfolio.title": "Portfolio",
    "portfolio.subtitle": "Featured projects",
    "portfolio.view-details": "View details",

    // Gaming
    "gaming.title": "Gaming",
    "gaming.subtitle": "Live streams on TikTok",
    "gaming.description": "I do live video game streams on TikTok, creating entertaining content and building an active community.",
    "gaming.platform": "Platform",
    "gaming.followers": "Followers",
    "gaming.status": "Status",
    "gaming.follow": "Follow",
    "gaming.live": "LIVE",
    "gaming.offline": "OFFLINE",

    // Mission/Vision
    "mission-vision.mission.title": "Mission",
    "mission-vision.mission.description": "Transform ideas into quality, accessible and scalable digital solutions for entrepreneurs and companies in LATAM.",
    "mission-vision.vision.title": "Vision",
    "mission-vision.vision.description": "Be the trusted developer for startups and companies seeking technological innovation without compromising quality.",

    // Process
    "process.title": "Work Process",
    "process.subtitle": "How we work together",
    "process.step1.title": "Consultation",
    "process.step1.description": "We understand your idea and needs",
    "process.step2.title": "Proposal",
    "process.step2.description": "We present budget and timeline",
    "process.step3.title": "Development",
    "process.step3.description": "We build your solution with quality",
    "process.step4.title": "Delivery",
    "process.step4.description": "We launch and provide ongoing support",
    "process.testimonial1.author": "Client 1",
    "process.testimonial1.text": "Excellent work, very professional and detail-oriented.",
    "process.testimonial2.author": "Client 2",
    "process.testimonial2.text": "Exceeded my expectations, I highly recommend it.",
    "process.testimonial3.author": "Client 3",
    "process.testimonial3.text": "Fast, efficient and high quality. Perfect.",

    // About
    "about.title": "About",
    "about.subtitle": "Full Stack Developer",
    "about.bio": "I'm José Gregorio, a full stack developer specialized in React, Node.js, Python and Solidity. I'm passionate about creating innovative digital solutions and sharing my love for video games.",
    "about.skills": "Skills",
    "about.tech-stack": "Tech Stack",
    "about.linkedin": "View LinkedIn",

    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Do you have a project in mind?",
    "contact.email": "Email",
    "contact.tiktok": "TikTok",
    "contact.follow": "Follow",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.phone": "Phone",
    "contact.form.service": "Service",
    "contact.form.description": "Project Description",
    "contact.form.budget": "Budget",
    "contact.form.timeline": "Timeline",
    "contact.form.message": "Additional Message",
    "contact.form.send": "Send Quote",
    "contact.form.success": "Quote sent! I'll get in touch soon.",
    "contact.form.error": "Error sending. Please try again.",
    "contact.budget.100-300": "$100 - $300",
    "contact.budget.300-500": "$300 - $500",
    "contact.budget.500-1000": "$500 - $1000",
    "contact.budget.1000+": "$1000+",
    "contact.timeline.urgent": "Urgent",
    "contact.timeline.1-2weeks": "1-2 weeks",
    "contact.timeline.1month": "1 month",
    "contact.timeline.flexible": "Flexible",

    // Footer
    "footer.brand": "DevGamer Studio",
    "footer.description": "Custom software, premium landing pages, Web3 and gaming live streams. Your vision, made real in code.",
    "footer.navigation": "Navigation",
    "footer.socials": "Social Media",
    "footer.available": "Available for projects",
    "footer.response-time": "Response in < 24h guaranteed",
    "footer.copyright": "© {year} DevGamer Studio. Made with ❤️ and lots of coffee.",
    "footer.powered": "Powered by React + Framer Motion",

    // ChatBot
    "chatbot.greeting": "Hello! 👋 I'm DevGamer Studio's assistant. How can I help you?",
    "chatbot.q1": "What services do you offer?",
    "chatbot.a1": "I offer three main services: Custom software (web apps, APIs, systems), high-conversion landing pages, and Web3 & Blockchain (smart contracts, dApps). Which one interests you?",
    "chatbot.q2": "How much does a project cost?",
    "chatbot.a2": "Landing pages start from $100 to $1000 depending on complexity and design. Custom software starts from $150 onwards depending on what you need. Web3 and blockchain have custom pricing. Tell me your project and I'll give you an exact quote.",
    "chatbot.q3": "What's the delivery time?",
    "chatbot.a3": "It depends on complexity. Landing pages: 1-2 weeks. Software: 2-8 weeks. But I always try to be as fast as possible without sacrificing quality.",
    "chatbot.q4": "How do I hire your services?",
    "chatbot.a4": "Fill out the quote form in the Contact section, and I'll get in touch within 24 hours. You can also follow me on TikTok @wildrif.",
    "chatbot.q5": "Do you work with startups?",
    "chatbot.a5": "Of course. I work with startups, entrepreneurs and companies. I have flexible plans for all budgets and situations.",
    "chatbot.q6": "What technologies do you use?",
    "chatbot.a6": "React, Node.js, TypeScript, PostgreSQL, Docker, Stripe, and more. Always the best tools for your specific project.",
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es");

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language | null;
    if (saved) setLanguage(saved);
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations["es"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
