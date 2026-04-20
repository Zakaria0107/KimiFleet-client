import { motion } from "framer-motion";
import { ShieldCheck, Globe, Heart, Sparkles } from "lucide-react";

const features = [
  { icon: ShieldCheck, title: "Multi-Tenant Isolation", desc: "Manage multiple legal entities from one login with completely isolated databases." },
  { icon: Globe, title: "Data Autonomy", desc: "Allocate specific hardware and drivers to granular branches with total privacy." },
  { icon: Heart, title: "Automated Invoicing", desc: "Financial data strictly partitioned per branch for instantaneous reconciliation." },
];

const WhyUsSection = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
          <Sparkles size={16} />
          <span>Enterprise Architecture</span>
        </div>
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          Unified Command Center <span className="text-blue-600">for Multiple Branches</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6"
            >
              <f.icon size={32} />
            </motion.div>
            <h3 className="font-display text-xl font-semibold text-gray-900 mb-3 tracking-tight">{f.title}</h3>
            <p className="text-gray-500 font-body text-sm leading-relaxed max-w-xs mx-auto">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUsSection;
