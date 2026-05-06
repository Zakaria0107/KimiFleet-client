import { motion } from "framer-motion";
import { FileText, CheckCircle2, TrendingUp } from "lucide-react";
import { useTranslation } from "../../node_modules/react-i18next";

const FinancialPulseSection = () => {
  const { t } = useTranslation();
  return (
    <section id="invoicing" className="py-32 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-black border border-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium">
              <FileText size={16} />
              <span>{t("finance.badge")}</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-gray-900">
              {t("finance.title")}
            </h2>

            <p className="text-xl text-gray-600 font-light leading-relaxed">
              {t("finance.subtitle")}
            </p>

            <button className="bg-black text-white px-8 py-4 rounded-lg font-body font-medium text-base tracking-tight hover:bg-gray-800 transition-all shadow-xl">
              {t("finance.cta")}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Pure CSS Apple-Style Invoice Card instead of image */}
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] w-full max-w-md border border-gray-100 relative z-10">
              <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-100">
                <div>
                  <h3 className="font-display font-bold text-2xl text-gray-900">{t("finance.invoice")}</h3>
                  <p className="text-sm text-gray-400 mt-1">INV-2026-0042</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">{t("finance.amount_due")}</p>
                  <p className="font-display font-bold text-3xl text-black">8,420.50 {t("common.mad")}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{t("finance.base_rental")}</span>
                  <span className="font-medium text-gray-900">3,500.00 {t("common.mad")}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{t("finance.security_deposit")}</span>
                  <span className="font-medium text-gray-900">4,500.00 {t("common.mad")}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">{t("finance.insurance")}</span>
                  <span className="font-medium text-gray-900">420.50 {t("common.mad")}</span>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1.5 rounded-full text-xs font-semibold">
                  <CheckCircle2 size={14} />
                  <span>{t("finance.auto_gen")}</span>
                </div>
                <p className="text-xs text-gray-400">Powered by Kimifleet</p>
              </div>
            </div>

            {/* Floating shadow element */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
                  <FileText className="text-gray-900" size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">{t("finance.billed_to")}</p>
                  <p className="font-semibold text-gray-900">{t("finance.account")}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FinancialPulseSection;
