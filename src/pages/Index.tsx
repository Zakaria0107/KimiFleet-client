import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import CommandCenterSection from "@/components/CommandCenterSection";
import LifecycleSection from "@/components/LifecycleSection";
import FinancialPulseSection from "@/components/FinancialPulseSection";
import MapExperienceSection from "@/components/MapExperienceSection";
import AnalyticsSection from "@/components/AnalyticsSection";
import WhyUsSection from "@/components/WhyUsSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
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
      <Navbar />
      
      <HeroSection />
      
      {/* 2. The Chaos: Problem Section */}
      <ProblemSection />
      
      {/* 2. The Command Center: Multi-Business Management */}
      <CommandCenterSection />
      
      {/* 3. The Lifecycle Engine: Distance-Based Maintenance */}
      <LifecycleSection />
      
      {/* 5. The Financial Pulse: Invoicing & Revenue */}
      <FinancialPulseSection />
      
      {/* 6. The Map Experience: Real-Time UI */}
      <MapExperienceSection />
      
      {/* 7. The Management Analytics: Data Insights */}
      <AnalyticsSection />
      
      {/* 8. Why Us: Benefits */}
      <WhyUsSection />
      
      {/* 9. Process: How It Works */}
      <ServicesSection />

      {/* 10. Pricing: Plans */}
      <PricingSection />

      {/* 11. FAQ: Help */}
      <FAQSection />
      
      {/* 8. The Briefing: Expert Contact Form */}
      {/* <ContactSection /> */}
      
      <Footer />
    </main>
  );
};

export default Index;
