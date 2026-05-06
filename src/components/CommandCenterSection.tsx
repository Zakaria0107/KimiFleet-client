import { motion } from "framer-motion";
import { Layout, Building2 } from "lucide-react";
import { useTranslation } from "../../node_modules/react-i18next";
import commandImg from "@/assets/kimi_command.png";

const CommandCenterSection = () => {
  const { t } = useTranslation();
  return (
    <section id="solution" className="py-32 bg-[#0B0F19] text-white overflow-hidden relative">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />

      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Layout size={16} />
              <span>{t("solution.badge")}</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              {t("solution.title")}
            </h2>

            <p className="text-xl text-gray-400 font-light leading-relaxed mb-12">
              {t("solution.subtitle")}
            </p>

            <ul className="space-y-4 pt-4">
              {[
                t("solution.feature_1"),
                t("solution.feature_2"),
                t("solution.feature_3")
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Ambient glow behind image */}
            <div className="absolute inset-0 bg-cyan-500/20 blur-[100px] rounded-full" />

            <img
              src={commandImg}
              alt="Glassmorphism UI Command Center Dropdown"
              className="relative z-10 w-full h-auto rounded-3xl shadow-2xl border border-white/10"
            />

            {/* Floating element simulating standard SaaS aesthetic */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -left-8 top-12 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 z-20 shadow-2xl"
            >
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <Building2 className="text-cyan-400" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2">{t("solution.multi_tenant_title")}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{t("solution.multi_tenant_desc")}</p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CommandCenterSection;
