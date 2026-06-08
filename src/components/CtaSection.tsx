import { motion } from "framer-motion";
import poolImg from "@/assets/cta-bg.png";

const CtaSection = ({ onContactOpen }: { onContactOpen?: () => void }) => (
  <section className="relative py-24 overflow-hidden">
    <div className="absolute inset-0">
      <img src={poolImg} alt="Vue piscine Agadir" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-900/90 to-gray-950/95" />
    </div>
    <div className="relative z-10 container mx-auto px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-display text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
          Scale Your Fleet
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Operations Today
          </span>
        </h2>
        <p className="text-gray-300 text-lg max-w-xl mx-auto mb-10 font-body">
          Join the elite layer of operators who leverage deep Teltonika integration for unparalleled insight.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onContactOpen}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-body font-medium text-base tracking-tight hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30"
          >
            Request Expert Demo
          </button>
          <a
            href="https://wa.me/212773273153"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-white/30 text-white px-8 py-4 rounded-lg font-body font-medium text-base tracking-tight hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            Consult with an Expert
          </a>
        </div>
      </motion.div>
    </div>
  </section>
);

export default CtaSection;
