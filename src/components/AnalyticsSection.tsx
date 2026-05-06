import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { BarChart3 } from "lucide-react";
import { useTranslation } from "react-i18next";

// Mock Data for the chart
const data = [
  { name: 'Mon', utilization: 65, revenue: 2400 },
  { name: 'Tue', utilization: 72, revenue: 3800 },
  { name: 'Wed', utilization: 68, revenue: 3200 },
  { name: 'Thu', utilization: 85, revenue: 4900 },
  { name: 'Fri', utilization: 94, revenue: 5800 },
  { name: 'Sat', utilization: 98, revenue: 6200 },
  { name: 'Sun', utilization: 91, revenue: 5400 },
];

const AnalyticsSection = () => {
  const { t } = useTranslation();
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
                <p className="font-display font-bold text-3xl text-gray-900">84.2%</p>
              </div>
              <div className="w-px bg-gray-200" />
              <div>
                <p className="text-3xl font-bold text-gray-900">+12%</p>
                <p className="text-sm text-gray-500 mt-1">Revenue Growth</p>
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
                <p className="font-display font-bold text-xl text-gray-900">42,500.00 {t("common.mad")}</p>
                <p className="text-xs text-green-600 font-medium">+15.2% {t("analytics.vs_last_week")}</p>
              </div>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
