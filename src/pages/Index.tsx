import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CommandCenterSection from "@/components/CommandCenterSection";
import LifecycleSection from "@/components/LifecycleSection";
import HardwareSection from "@/components/HardwareSection";
import FinancialPulseSection from "@/components/FinancialPulseSection";
import MapExperienceSection from "@/components/MapExperienceSection";
import AnalyticsSection from "@/components/AnalyticsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";

const Index = () => {
  const [contactOpen, setContactOpen] = useState(false);
  const location = useLocation();

  // Handle scroll to section when navigating with hash
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [location]);

  return (
    <main className="bg-background">
      <Navbar onContactOpen={() => setContactOpen(true)} />
      
      {/* 1. The Hero: The Mastery Section */}
      <HeroSection onContactOpen={() => setContactOpen(true)} />
      
      {/* 2. The Command Center: Multi-Business Management */}
      <CommandCenterSection />
      
      {/* 3. The Lifecycle Engine: Distance-Based Maintenance */}
      <LifecycleSection />
      
      {/* 4. The Hardware Synergy: Teltonika Integration */}
      <HardwareSection />
      
      {/* 5. The Financial Pulse: Invoicing & Revenue */}
      <FinancialPulseSection />
      
      {/* 6. The Map Experience: Real-Time UI */}
      <MapExperienceSection />
      
      {/* 7. The Management Analytics: Data Insights */}
      <AnalyticsSection />
      
      {/* 8. The Briefing: Expert Contact Form */}
      <ContactSection />
      
      <Footer />
      
      {/* Legacy form popup just in case */}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </main>
  );
};

export default Index;
