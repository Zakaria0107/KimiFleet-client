import { motion } from "framer-motion";
import { Navigation } from "lucide-react";

const MapExperienceSection = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden bg-[#E5E7EB]">
      {/* Background Image: using a light silver map aesthetic */}
      <div 
        className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale opacity-50"
      />
      
      {/* Map Dots Overlay (Simulated Data) */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        {[
          { top: '30%', left: '20%', delay: 0 },
          { top: '45%', left: '50%', delay: 0.5 },
          { top: '60%', left: '70%', delay: 1 },
          { top: '25%', left: '80%', delay: 0.2 },
          { top: '75%', left: '35%', delay: 0.8 },
        ].map((dot, i) => (
          <div key={i} className="absolute" style={{ top: dot.top, left: dot.left }}>
            <motion.div 
              animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 2, delay: dot.delay }}
              className="w-4 h-4 bg-blue-500 rounded-full"
            />
            <div className="w-4 h-4 bg-blue-600 rounded-full absolute top-0 left-0" />
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-[10px] font-bold text-gray-800 whitespace-nowrap">
              Active
            </div>
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto bg-white/90 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border border-white"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Navigation size={16} />
            <span>Real-Time UI</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900 mb-6">
            Fluid. <span className="text-gray-400">Real-time.</span> Remarkable.
          </h2>
          
          <p className="text-lg text-gray-600 font-light leading-relaxed">
            Watch your empire move. A map interface designed for clarity, not clutter. Experience Apple-style minimalism for enterprise logistics.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MapExperienceSection;
