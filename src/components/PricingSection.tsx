import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { useTranslation } from "../../node_modules/react-i18next";

const PricingSection = () => {
  const { t } = useTranslation();

  const features = [
    t("pricing.feature_1"),
    t("pricing.feature_2"),
    t("pricing.feature_3"),
    t("pricing.feature_4"),
    t("pricing.feature_5"),
    t("pricing.feature_6"),
  ];

  const plans = [
    {
      name: t("pricing.plan3_name"),
      price: "700",
      perMonth: "233",
      highlighted: false,
    },
    {
      name: t("pricing.plan6_name"),
      price: "1300",
      perMonth: "217",
      highlighted: true,
      badge: t("pricing.best_value"),
      savings: t("pricing.savings"),
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles size={16} />
            <span>{t("pricing.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
            {t("pricing.title")}
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t("pricing.subtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className={`relative rounded-3xl p-8 flex flex-col ${
                plan.highlighted
                  ? "bg-gray-900 text-white shadow-2xl shadow-blue-900/20 md:-translate-y-4"
                  : "bg-white border border-gray-200"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">
                  {plan.badge}
                </span>
              )}

              <h3 className={`font-display text-xl font-semibold mb-1 tracking-tight ${plan.highlighted ? "text-white" : "text-gray-900"}`}>
                {plan.name}
              </h3>

              <div className="flex items-baseline gap-2 mt-4 mb-1">
                <span className={`text-5xl font-bold tracking-tight ${plan.highlighted ? "text-white" : "text-gray-900"}`}>
                  {plan.price}
                </span>
                <span className={plan.highlighted ? "text-gray-300" : "text-gray-500"}>{t("common.mad")}</span>
              </div>
              <p className={`text-xs mb-2 ${plan.highlighted ? "text-gray-400" : "text-gray-400"}`}>
                {t("pricing.per_month", { amount: plan.perMonth })}
              </p>
              {plan.savings ? (
                <p className="text-xs font-medium text-blue-400 mb-6">{plan.savings}</p>
              ) : (
                <div className="mb-6" />
              )}

              <ul className="space-y-3 mb-8 grow">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check size={18} className={`shrink-0 mt-0.5 ${plan.highlighted ? "text-blue-400" : "text-blue-600"}`} />
                    <span className={`text-sm ${plan.highlighted ? "text-gray-200" : "text-gray-600"}`}>{feature}</span>
                  </li>
                ))}
              </ul>

              <a href="https://kimifleet.com/dashboard/" target="_blank" rel="noopener noreferrer">
                <button
                  className={`w-full py-3.5 rounded-lg font-body text-sm font-medium tracking-tight transition-all ${
                    plan.highlighted
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-900 text-white hover:bg-gray-800"
                  }`}
                >
                  {t("pricing.cta")}
                </button>
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-sm mt-10 max-w-xl mx-auto">
          {t("pricing.note")}
        </p>
      </div>
    </section>
  );
};

export default PricingSection;
