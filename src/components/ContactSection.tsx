import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "../../node_modules/react-i18next";

const ContactSection = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert(t("contact.success_alert") || "Briefing request sent. An expert will contact you shortly.");
    }, 1000);
  };

  return (
    <section id="contact" className="py-32 bg-white relative">
      <div className="container mx-auto px-4 max-w-2xl text-center">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight tracking-tight text-gray-900 mb-4">
            {t("contact.title")}
          </h2>
          <p className="text-xl text-gray-500 font-light">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 md:p-12 rounded-3xl border border-gray-100 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] text-left space-y-6"
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">{t("contact.name")}</label>
              <input
                type="text"
                required
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900">{t("contact.email")}</label>
              <input
                type="email"
                required
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all"
                placeholder="john@company.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">{t("contact.fleet_size")}</label>
            <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all appearance-none cursor-pointer">
              <option disabled>{t("contact.select_size")}</option>
              <option>{t("contact.v1_10")}</option>
              <option>{t("contact.v11_50")}</option>
              <option>{t("contact.v50_plus")}</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-900">{t("contact.branches_count")}</label>
            <select className="w-full bg-gray-50 border border-gray-200 text-gray-900 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-black transition-all appearance-none cursor-pointer">
              <option disabled>{t("contact.select_branches")}</option>
              <option>{t("contact.b1")}</option>
              <option>{t("contact.b2_5")}</option>
              <option>{t("contact.b6_plus")}</option>
              <option>{t("contact.b_franchise")}</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white px-8 py-4 rounded-lg font-body font-bold text-lg hover:bg-gray-800 transition-all mt-4 tracking-tight"
          >
            {isSubmitting ? t("contact.processing") : t("contact.book")}
          </button>
        </motion.form>

        <p className="text-sm text-gray-400 mt-8">
          {t("contact.confidential")}
        </p>

      </div>
    </section>
  );
};

export default ContactSection;
