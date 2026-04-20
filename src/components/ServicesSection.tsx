import { motion } from "framer-motion";
import { KeyRound, Building2, TrendingUp, Sparkles } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Sub-Second Polling",
    description: "Capture high-frequency GPS ping data directly from your Teltonika devices for maximum accuracy.",
    badge: "TCP Listener",
    cta: "View Data Flow",
    ctaHref: "#appartements",
  },
  {
    icon: KeyRound,
    title: "Odometer Syncing",
    description: "Hardware-software synergy mapping exact physical distances to digital odometers without lag.",
    badge: "Hardware Sync",
    cta: "Explore Hardware",
    ctaHref: "#contact",
  },
  {
    icon: TrendingUp,
    title: "Geofence Mastery",
    description: "Automated boundary alerts integrated directly with branch operations for seamless logistics.",
    badge: "Spatial Logic",
    cta: "Set Boundaries",
    ctaHref: "#contact",
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            <span>Core Technology</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Real-time Telematics <span className="text-blue-600">Precision</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto font-body">
            Military-grade tracking with our unified TCP Listener infrastructure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <service.icon size={28} />
              </div>

              <span className="text-xs text-blue-600 font-medium uppercase tracking-wide block mb-3">
                {service.badge}
              </span>

              <h3 className="font-display text-xl font-semibold text-gray-900 mb-3 tracking-tight">{service.title}</h3>
              <p className="text-gray-500 font-body text-sm leading-relaxed mb-6">{service.description}</p>

              <a
                href={service.ctaHref}
                className="inline-flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg font-body text-sm font-medium tracking-tight hover:bg-blue-600 transition-colors"
              >
                {service.cta}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
