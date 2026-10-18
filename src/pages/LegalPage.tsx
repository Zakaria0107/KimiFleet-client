import { ChevronRight, FileWarning } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { findRoute, pathFor } from "@/seo/routes";

interface LegalContent {
  breadcrumb: string;
  h1: string;
  /** Optional banner above the text, e.g. while a page is still a draft. */
  notice?: string;
  sections: { h2: string; text: string }[];
}

/**
 * Legal pages (terms of service). The text comes from `pages.<id>` in
 * src/locales/pages.<lang>.json.
 */
const LegalPage = () => {
  const { t } = useTranslation();
  const route = findRoute(useLocation().pathname);
  if (!route) return null;

  const content = t(`pages.${route.page}`, { returnObjects: true }) as LegalContent;

  return (
    <main className="bg-background">
      <Navbar />

      <section className="bg-gray-950 pt-32 pb-14">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-400 font-body">
              <li>
                <a href={pathFor("home", route.lang)} className="hover:text-white transition-colors">
                  {t("pages.common.home")}
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-200" aria-current="page">
                <ChevronRight size={14} aria-hidden="true" className="text-gray-400" />
                {content.breadcrumb}
              </li>
            </ol>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white tracking-tight">{content.h1}</h1>
        </div>
      </section>

      <article className="py-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          {content.notice && (
            <p className="flex gap-3 items-start rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 mb-12 font-body text-sm text-amber-900 leading-relaxed">
              <FileWarning size={18} className="shrink-0 mt-0.5" aria-hidden="true" />
              {content.notice}
            </p>
          )}
          <div className="space-y-10">
            {content.sections.map((section) => (
              <section key={section.h2}>
                <h2 className="font-display text-xl md:text-2xl font-bold text-gray-900 mb-3 tracking-tight">{section.h2}</h2>
                <p className="font-body text-gray-600 leading-relaxed">{section.text}</p>
              </section>
            ))}
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
};

export default LegalPage;
