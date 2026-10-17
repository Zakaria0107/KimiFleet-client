import { motion } from "framer-motion";
import { Car, Calendar, QrCode, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const ServicesSection = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: Car,
      title: t("process.step1_title"),
      description: t("process.step1_desc"),
      badge: "Step 1",
    },
    {
      icon: Calendar,
      title: t("process.step2_title"),
      description: t("process.step2_desc"),
      badge: "Step 2",
    },
    {
      icon: QrCode,
      title: t("process.step3_title"),
      description: t("process.step3_desc"),
      badge: "Step 3",
    },
    {
      icon: TrendingUp,
      title: t("process.step4_title"),
      description: t("process.step4_desc"),
      badge: "Step 4",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp size={16} />
            <span>{t("process.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {t("process.title")}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t("process.join")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-xl border border-gray-200 p-8 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <step.icon size={28} />
              </div>

              <span className="text-xs text-blue-600 font-medium uppercase tracking-wide block mb-3">
                {step.badge}
              </span>

              <h3 className="font-display text-xl font-semibold text-gray-900 mb-3 tracking-tight">{step.title}</h3>
              <p className="text-gray-500 font-body text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
