// Builds the per-page <head> tags, JSON-LD and sitemap.xml from the route config.
// Used at build time by scripts/prerender.mjs (through entry-server.tsx).
import { createI18n } from "../i18n";
import { FAQ_ITEMS } from "../data/faq";
import { PLANS, PRICE_CURRENCY } from "../data/pricing";
import {
  DEFAULT_LANG,
  OG_IMAGES,
  OG_LOCALES,
  SITE_URL,
  ROUTES,
  absoluteUrl,
  alternatesFor,
  type SeoRoute,
} from "./routes";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const PHONE = "+212773273153";

const escapeHtml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const meta = (attr: "name" | "property", key: string, content: string) =>
  `<meta ${attr}="${key}" content="${escapeHtml(content)}" />`;

/** fr, en and x-default (pointing to the default language) for every page that exists in several languages. */
const hreflangLinks = (route: SeoRoute) => {
  const alternates = alternatesFor(route.page);
  const xDefault = alternates.find((alt) => alt.lang === DEFAULT_LANG) ?? route;
  return [
    ...alternates.map((alt) => `<link rel="alternate" hreflang="${alt.lang}" href="${absoluteUrl(alt.path)}" />`),
    `<link rel="alternate" hreflang="x-default" href="${absoluteUrl(xDefault.path)}" />`,
  ];
};

const organization = () => ({
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "KimiFleet",
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/logo2.png`,
  email: "contact@kimifleet.com",
  telephone: PHONE,
  address: { "@type": "PostalAddress", addressLocality: "Agadir", addressCountry: "MA" },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: PHONE,
    contactType: "sales",
    areaServed: "MA",
    availableLanguage: ["French", "English", "Arabic"],
  },
});

const softwareApplication = (route: SeoRoute, t: (key: string) => string) => ({
  "@type": "SoftwareApplication",
  name: "KimiFleet",
  url: absoluteUrl(route.path),
  description: route.description,
  inLanguage: route.lang,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  publisher: { "@id": ORGANIZATION_ID },
  offers: PLANS.map((plan) => ({
    "@type": "Offer",
    name: t(plan.nameKey),
    price: String(plan.price),
    priceCurrency: PRICE_CURRENCY,
    url: `${absoluteUrl(route.path)}#pricing`,
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: String(plan.price),
      priceCurrency: PRICE_CURRENCY,
      billingDuration: `P${plan.months}M`,
    },
  })),
});

const faqPage = (route: SeoRoute, t: (key: string) => string) => ({
  "@type": "FAQPage",
  url: absoluteUrl(route.path),
  inLanguage: route.lang,
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: t(item.question),
    acceptedAnswer: { "@type": "Answer", text: t(item.answer) },
  })),
});

const jsonLdScript = (route: SeoRoute) => {
  const t = createI18n(route.lang).t;
  const graph = route.jsonLd.map((type) => {
    switch (type) {
      case "Organization":
        return organization();
      case "SoftwareApplication":
        return softwareApplication(route, t);
      case "FAQPage":
        return faqPage(route, t);
    }
  });
  // Escape "<" so text can never close the <script> element.
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return `<script type="application/ld+json">${json}</script>`;
};

export const buildHead = (route: SeoRoute): string => {
  const url = absoluteUrl(route.path);
  const ogImage = OG_IMAGES[route.lang];
  const otherLocales = alternatesFor(route.page)
    .filter((alt) => alt.lang !== route.lang)
    .map((alt) => meta("property", "og:locale:alternate", OG_LOCALES[alt.lang]));

  return [
    `<title>${escapeHtml(route.title)}</title>`,
    meta("name", "description", route.description),
    `<link rel="canonical" href="${url}" />`,
    ...hreflangLinks(route),
    meta("property", "og:type", "website"),
    meta("property", "og:site_name", "KimiFleet"),
    meta("property", "og:title", route.title),
    meta("property", "og:description", route.description),
    meta("property", "og:url", url),
    meta("property", "og:image", ogImage.url),
    meta("property", "og:image:type", ogImage.type),
    meta("property", "og:image:width", String(ogImage.width)),
    meta("property", "og:image:height", String(ogImage.height)),
    meta("property", "og:image:alt", route.ogImageAlt),
    meta("property", "og:locale", OG_LOCALES[route.lang]),
    ...otherLocales,
    meta("name", "twitter:card", "summary_large_image"),
    meta("name", "twitter:title", route.title),
    meta("name", "twitter:description", route.description),
    meta("name", "twitter:image", ogImage.url),
    meta("name", "twitter:image:alt", route.ogImageAlt),
    jsonLdScript(route),
  ].join("\n  ");
};

export const buildNotFoundHead = (): string =>
  [
    `<title>Page introuvable · Page not found | KimiFleet</title>`,
    meta("name", "robots", "noindex"),
  ].join("\n  ");

export const buildSitemap = (): string => {
  const urls = ROUTES.map((route) => {
    const alternates = hreflangLinks(route).map((link) =>
      link.replace("<link ", "<xhtml:link ").replace(" />", "/>"),
    );
    return [
      "  <url>",
      `    <loc>${absoluteUrl(route.path)}</loc>`,
      `    <lastmod>${route.lastmod}</lastmod>`,
      ...alternates.map((link) => `    ${link}`),
      "  </url>",
    ].join("\n");
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    "</urlset>",
    "",
  ].join("\n");
};
