/* =============================================================
   Home — DevGamer Studio
   Style: Neon Arcade Retro-Futurista
   Main page assembling all sections
   ============================================================= */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import GamingSection from "@/components/GamingSection";
import MissionVisionSection from "@/components/MissionVisionSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070b14] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <PortfolioSection />
      <GamingSection />
      <MissionVisionSection />
      <ProcessSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
