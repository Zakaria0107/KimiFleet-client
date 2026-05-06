import { motion } from "framer-motion";
import { AlertCircle, FileX, Clock, DollarSign } from "lucide-react";
import { useTranslation } from "react-i18next";

const ProblemSection = () => {
  const { t } = useTranslation();
  const problems = [
    {
      icon: <AlertCircle className="text-red-500" size={24} />,
      title: t("problem.fatigue_title"),
      description: t("problem.fatigue_desc")
    },
    {
      icon: <FileX className="text-red-500" size={24} />,
      title: t("problem.paperwork_title"),
      description: t("problem.paperwork_desc")
    },
    {
      icon: <Clock className="text-red-500" size={24} />,
      title: t("problem.maintenance_title"),
      description: t("problem.maintenance_desc")
    },
    {
      icon: <DollarSign className="text-red-500" size={24} />,
      title: t("problem.revenue_title"),
      description: t("problem.revenue_desc")
    }
  ];

  return (
    <section id="problem" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <AlertCircle size={16} />
            <span>{t("problem.badge")}</span>
          </motion.div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900 mb-6">
            {t("problem.title")}
          </h2>
          <p className="text-xl text-gray-500 font-light leading-relaxed">
            {t("problem.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((prob, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:border-red-100 transition-colors group"
            >
              <div className="mb-6 p-3 bg-white rounded-2xl w-fit shadow-sm group-hover:shadow-md transition-shadow">
                {prob.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{prob.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {prob.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
