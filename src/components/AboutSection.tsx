import { motion } from "framer-motion";
import { Shield, Eye, Heart, Check } from "lucide-react";
import aboutImg from "@/assets/about-tech.png";

const badges = [
  { icon: Eye, label: "Lifecycle ROI" },
  { icon: Shield, label: "Preventative Logic" },
  { icon: Heart, label: "Hardware Synergy" },
];

const AboutSection = () => {
  return (
    <section id="apropos" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src={aboutImg}
              alt="Intérieur d'un appartement Immobaz.Kima"
              className="rounded-2xl w-full object-cover aspect-[4/3] shadow-2xl"
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute -bottom-6 -right-6 bg-blue-600 text-white rounded-2xl p-6 shadow-xl"
            >
              <span className="font-display text-3xl font-bold block">100%</span>
              <span className="text-blue-200 text-sm font-body">Data Driven</span>
            </motion.div>
            
            <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="text-green-600" size={20} />
              </div>
              <div>
                <span className="font-display font-semibold text-gray-900 block">+500k</span>
                <span className="text-gray-500 text-sm">Maintenance Events Logged</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
              <span>Asset Longevity</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-6 tracking-tight leading-tight">
              Distance-Based Maintenance <span className="text-blue-600">Mastery</span>
            </h2>
            <p className="text-gray-600 font-body leading-relaxed mb-4">
              We don't just track cars; we track element lifecycles. By utilizing precise GPS distance data (odometer tracking), FleetOps accurately dictates when to change oil, tires, or filters.
            </p>
            <p className="text-gray-600 font-body leading-relaxed mb-8">
              Maximize your ROI by shifting from reactive repairs to data-driven proactive maintenance. Every mile tracked is another dollar saved for your enterprise.
            </p>

            <div className="flex flex-wrap gap-4">
              {badges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl border border-gray-200 shadow-sm"
                >
                  <badge.icon size={18} className="text-blue-600" />
                  <span className="font-body text-sm font-medium text-gray-700">{badge.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
