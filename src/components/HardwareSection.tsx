import { motion } from "framer-motion";
import { Cpu, Zap } from "lucide-react";
import hardwareImg from "@/assets/about-tech.png"; // Repurposed GPS hardware image

const HardwareSection = () => {
  return (
    <section className="py-32 bg-[#050505] text-white">
      <div className="container mx-auto px-4 text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-gray-300 px-4 py-2 rounded-full text-sm font-medium">
            <Cpu size={16} />
            <span>Teltonika Integration</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight tracking-tight">
            Native <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-500">Telematics.</span>
          </h2>
          
          <p className="text-xl text-gray-400 font-light leading-relaxed mb-12">
            Deep integration with Teltonika hardware ensures 0.5s latency. Real-time data isn’t a feature; it’s the standard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-16 mx-auto max-w-5xl relative"
        >
          {/* Wireframe/network backdrop effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-[#050505]/0 to-[#050505] z-0" />
          
          <img 
            src={hardwareImg} 
            alt="Hardware Tracker integration" 
            className="w-full rounded-2xl border border-white/5 shadow-2xl relative z-10"
          />

          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 blur-2xl rounded-full z-20"
          />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          {[
            { metric: "0.5s", text: "Polling Latency" },
            { metric: "100%", text: "Data Integrity" },
            { metric: "Zero", text: "Data Loss in Tunnels" }
          ].map((item, i) => (
            <div key={i} className="border-l border-white/10 pl-6 text-left">
              <p className="font-display text-3xl font-bold text-white mb-2">{item.metric}</p>
              <p className="text-sm text-gray-400">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HardwareSection;
