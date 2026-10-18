import { Check, ChevronRight, MessageCircle, Plus, Minus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingSection from "@/components/PricingSection";
import { CONTENT_PAGES, findRoute, pathFor, type PageId } from "@/seo/routes";

const SIGNUP_URL = "https://kimifleet.com/dashboard/signup";
const WHATSAPP_URL = "https://wa.me/212773273153";

interface PageSection {
  h2: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: string[];
}

interface PageContent {
  breadcrumb: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: PageSection[];
  faq: { q: string; a: string }[];
  cta: { title: string; text: string; button: string };
}

/**
 * Keyword landing pages (seo/routes.ts CONTENT_PAGES). The text comes from
 * src/locales/pages.<lang>.json; the page is picked from the URL.
 */
const ContentPage = () => {
  const { t } = useTranslation();
  const route = findRoute(useLocation().pathname);
  if (!route) return null;

  const page = route.page as PageId;
  const content = t(`pages.${page}`, { returnObjects: true }) as PageContent;
  const related = CONTENT_PAGES.filter((id) => id !== page);

  return (
    <main className="bg-background">
      <Navbar />

      {/* Hero */}
      <section className="bg-gray-950 pt-32 pb-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-gray-400 font-body">
              <li>
                <a href={pathFor("home", route.lang)} className="hover:text-white transition-colors">
                  {t("pages.common.home")}
                </a>
              </li>
              {/* The separator sits inside the item so the list has exactly two items, like the BreadcrumbList data. */}
              <li className="flex items-center gap-2 text-gray-200" aria-current="page">
                <ChevronRight size={14} aria-hidden="true" className="text-gray-400" />
                {content.breadcrumb}
              </li>
            </ol>
          </nav>

          <span className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6 font-body text-xs font-medium text-blue-300 tracking-wide uppercase">
            {content.eyebrow}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
            {content.h1}
          </h1>
          <p className="font-body text-gray-300 text-lg leading-relaxed mb-10">{content.intro}</p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={SIGNUP_URL}
              target="_blank"
              rel="noopener"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-body font-bold text-base text-center hover:bg-blue-700 transition-all"
            >
              {content.cta.button}
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 rounded-lg font-body font-medium text-base hover:bg-white/10 transition-all"
            >
              <MessageCircle size={18} />
              {t("pages.common.whatsapp")}
            </a>
          </div>
        </div>
      </section>

      {page === "pricing" && <PricingSection title={t("pages.pricing.plans_title")} />}

      {/* Sections */}
      <article className="py-16 md:py-20">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl space-y-14">
          {content.sections.map((section) => (
            <section key={section.h2}>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-5 tracking-tight">
                {section.h2}
              </h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="font-body text-gray-600 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
              {section.steps && (
                <ol className="space-y-4 mt-6">
                  {section.steps.map((step, i) => (
                    <li key={step} className="flex gap-4 items-start">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white font-display font-bold text-sm flex items-center justify-center">
                        {i + 1}
                      </span>
                      <span className="font-body text-gray-700 leading-relaxed pt-1">{step}</span>
                    </li>
                  ))}
                </ol>
              )}
              {section.bullets && (
                <ul className="space-y-3 mt-6">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-3 items-start">
                      <Check size={18} className="shrink-0 mt-1 text-blue-600" />
                      <span className="font-body text-gray-700 leading-relaxed">{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </article>

      {/* FAQ: answers stay in the HTML; <details> hides them and works without JavaScript */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-gray-900 mb-8 tracking-tight">
            {t("pages.common.faq_title")}
          </h2>
          <div className="space-y-4">
            {content.faq.map((item) => (
              <details key={item.q} className="group bg-white rounded-2xl border border-gray-100">
                <summary className="px-6 py-5 flex items-center justify-between gap-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="font-body text-base md:text-lg font-semibold text-gray-900">{item.q}</h3>
                  <Plus className="text-gray-400 shrink-0 group-open:hidden" size={20} />
                  <Minus className="text-blue-600 shrink-0 hidden group-open:block" size={20} />
                </summary>
                <p className="px-6 pb-6 font-body text-gray-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Related pages (internal links) */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl">
          <h2 className="font-display text-xl font-bold text-gray-900 mb-6 tracking-tight">
            {t("pages.common.related")}
          </h2>
          <ul className="grid sm:grid-cols-3 gap-4">
            {related.map((id) => (
              <li key={id}>
                <a
                  href={pathFor(id, route.lang)}
                  className="flex items-center justify-between gap-2 h-full rounded-xl border border-gray-200 px-5 py-4 font-body font-medium text-gray-800 hover:border-blue-400 hover:text-blue-600 transition-colors"
                >
                  {t(`pages.${id}.breadcrumb`)}
                  <ChevronRight size={16} className="shrink-0" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Final call to action */}
      <section className="py-16 bg-blue-600">
        <div className="container mx-auto px-6 lg:px-12 max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-white mb-4 tracking-tight">{content.cta.title}</h2>
          <p className="font-body text-blue-100 text-lg mb-8">{content.cta.text}</p>
          <a
            href={SIGNUP_URL}
            target="_blank"
            rel="noopener"
            className="inline-block bg-white text-blue-700 px-8 py-4 rounded-lg font-body font-bold text-base hover:bg-blue-50 transition-all"
          >
            {content.cta.button}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContentPage;
