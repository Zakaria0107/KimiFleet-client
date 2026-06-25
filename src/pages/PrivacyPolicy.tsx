import { useTranslation } from "../../node_modules/react-i18next";
import { Shield, Database, Bell, Lock, Mail, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const sections = [
  {
    icon: Database,
    key: "data_collected",
  },
  {
    icon: Shield,
    key: "how_we_use",
  },
  {
    icon: Lock,
    key: "data_security",
  },
  {
    icon: Bell,
    key: "notifications",
  },
  {
    icon: RefreshCw,
    key: "retention",
  },
  {
    icon: Mail,
    key: "contact",
  },
];

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <main className="bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-950 pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-12 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6">
            <Shield size={14} className="text-blue-400" />
            <span className="font-body text-xs font-medium text-blue-300 tracking-wide uppercase">
              {t("privacy.badge")}
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            {t("privacy.title")}
          </h1>
          <p className="font-body text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {t("privacy.subtitle")}
          </p>
          <p className="font-body text-gray-500 text-sm mt-4">
            {t("privacy.last_updated")}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          {sections.map(({ icon: Icon, key }) => (
            <div key={key} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-blue-600" />
                </div>
                <h2 className="font-display text-xl font-semibold text-gray-900">
                  {t(`privacy.${key}_title`)}
                </h2>
              </div>
              <p className="font-body text-gray-600 leading-relaxed text-sm md:text-base pl-[52px]">
                {t(`privacy.${key}_desc`)}
              </p>
            </div>
          ))}

          {/* Contact box */}
          <div className="mt-16 rounded-2xl bg-gray-950 p-8 text-center">
            <p className="font-body text-gray-300 text-sm mb-3">
              {t("privacy.questions")}
            </p>
            <a
              href="mailto:zakariabijaddigune1234@gmail.com"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-lg font-body text-sm font-medium hover:bg-blue-700 transition-all"
            >
              <Mail size={15} />
              zakariabijaddigune1234@gmail.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
