import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Users } from "lucide-react";
import heroImg from "@/assets/kimi_hero.png";

const HeroSection = ({ onContactOpen }: { onContactOpen?: () => void }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = 500;
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="accueil" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Vue aérienne de la côte d'Agadir"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-900/70 to-gray-950/90" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 px-5 py-2 rounded-full mb-8"
        >
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
          <span className="text-blue-300 text-sm font-medium">Built for the Modern Owner</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-display text-5xl md:text-6xl lg:text-8xl font-bold text-white leading-tight mb-8 tracking-tight"
        >
          Kimifleet.
          <br />
          <span className="text-white/90">
            It’s your fleet.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-gray-300 text-lg md:text-2xl max-w-3xl mx-auto mb-10 font-body"
        >
          The most precise way to manage assets, automate maintenance, and scale multiple rental businesses.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <a
            href="#appartements"
            className="bg-white text-black px-8 py-4 rounded-lg font-body font-bold text-base tracking-tight hover:bg-white/90 transition-all shadow-lg"
          >
            Request Access
          </a>
          <button
            onClick={onContactOpen}
            className="border border-white/30 text-white px-8 py-4 rounded-lg font-body font-medium text-base tracking-tight hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            Request Expert Demo
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Users className="text-white" size={20} />
          </div>
          <div className="text-left">
            <span className="text-white font-display font-bold text-xl">+{count}</span>
            <span className="text-gray-400 text-sm block">active assets tracked</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-3 bg-white/50 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
