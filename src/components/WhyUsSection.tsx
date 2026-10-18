import { motion } from "framer-motion";
import { Shield, Rocket, Target, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { langFromPath, pathFor } from "@/seo/routes";

const WhyUsSection = () => {
  const { t } = useTranslation();
  const lang = langFromPath(useLocation().pathname);
  const features = [
    {
      icon: <Target className="text-blue-600" />,
      title: t("benefits.save_hours_title"),
      description: t("benefits.save_hours_desc")
    },
    {
      icon: <Rocket className="text-blue-600" />,
      title: t("benefits.scale_title"),
      description: t("benefits.scale_desc")
    },
    {
      icon: <Shield className="text-blue-600" />,
      title: t("benefits.revenue_title"),
      description: t("benefits.revenue_desc")
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Zap size={16} />
            <span>{t("benefits.badge")}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mt-4 tracking-tight">
            {t("benefits.title")}
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-gray-50 border border-gray-100 text-center hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{f.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">
                {f.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contextual link to the Morocco page (internal linking for "logiciel location voiture Maroc") */}
        <p className="max-w-2xl mx-auto mt-12 text-center text-gray-600 leading-relaxed">
          {t("benefits.morocco_before")}
          <a href={pathFor("moroccoSoftware", lang)} className="font-semibold text-blue-600 underline underline-offset-4 hover:text-blue-700">
            {t("benefits.morocco_link")}
          </a>
          {t("benefits.morocco_after")}
        </p>
      </div>
    </section>
  );
};

export default WhyUsSection;
