import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ClientOnly } from "./ClientOnly";
import { formatAmount, formatPercent } from "@/lib/format";

// Recharts is browser-only and heavy: load it after hydration, outside the main chunk.
const AnalyticsChart = lazy(() => import("./AnalyticsChart"));

const AnalyticsSection = () => {
  const { t, i18n } = useTranslation();
  return (
    <section id="analytics" className="py-32 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <BarChart3 size={16} />
              <span>{t("analytics.badge")}</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900 mb-8">
              {t("analytics.title")}
            </h2>

            <p className="text-xl text-gray-600 font-light leading-relaxed">
              {t("analytics.subtitle")}
            </p>

            <div className="flex gap-6 mt-8">
              <div>
                <p className="text-sm text-gray-500 mb-1">{t("analytics.avg_utilization")}</p>
                <p className="font-display font-bold text-3xl text-gray-900">{formatPercent(0.842, i18n.language)}</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div>
                <p className="text-3xl font-bold text-gray-900">{formatPercent(0.12, i18n.language, { signed: true })}</p>
                <p className="text-sm text-gray-500 mt-1">{t("analytics.revenue_growth")}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]"
          >
            <div className="mb-6 flex justify-between items-end">
              <div>
                <h4 className="font-bold text-gray-900">{t("analytics.fleet_revenue")}</h4>
                <p className="text-xs text-gray-400">{t("analytics.weekly_performance")}</p>
              </div>
              <div className="text-right">
                <p className="font-display font-bold text-xl text-gray-900">{formatAmount(42500, i18n.language)} {t("common.mad")}</p>
                <p className="text-xs text-green-600 font-medium">{formatPercent(0.152, i18n.language, { signed: true })} {t("analytics.vs_last_week")}</p>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ClientOnly>
                <Suspense fallback={null}>
                  <AnalyticsChart />
                </Suspense>
              </ClientOnly>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
