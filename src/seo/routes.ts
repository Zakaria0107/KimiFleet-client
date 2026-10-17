// Single source of truth for the public marketing routes.
// Drives the React routes, the prerender script, per-page <head> tags, JSON-LD and sitemap.xml.

export const SITE_URL = "https://kimifleet.com";
export const OG_IMAGE = { url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, type: "image/jpeg" };

export const LANGS = ["fr", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "fr";

export const OG_LOCALES: Record<Lang, string> = { fr: "fr_FR", en: "en_US" };

export type PageId = "home" | "privacy";
export type JsonLdType = "Organization" | "SoftwareApplication" | "FAQPage";

export interface SeoRoute {
  page: PageId;
  lang: Lang;
  /** Public path. Language homes end with "/", inner pages have no trailing slash. */
  path: string;
  title: string;
  description: string;
  ogImageAlt: string;
  jsonLd: JsonLdType[];
  /** Date the page content last changed (YYYY-MM-DD), for sitemap.xml. Update it when you edit the page. */
  lastmod: string;
}

export const ROUTES: SeoRoute[] = [
  {
    page: "home",
    lang: "fr",
    path: "/fr/",
    title: "Logiciel de gestion de location de voitures | KimiFleet",
    description:
      "SaaS professionnel pour les agences de location de voitures : contrats digitaux avec signature QR, suivi GPS et gestion multi-agences. Commencez votre essai.",
    ogImageAlt: "Tableau de bord KimiFleet, logiciel de gestion de location de voitures",
    jsonLd: ["Organization", "SoftwareApplication", "FAQPage"],
    lastmod: "2026-10-17",
  },
  {
    page: "home",
    lang: "en",
    path: "/en/",
    title: "Car Rental Management Software | KimiFleet Fleet SaaS",
    description:
      "Professional SaaS for car rental agencies. Streamline fleet operations with QR digital contracts, GPS tracking, and multi-tenant management. Start your trial.",
    ogImageAlt: "KimiFleet car rental management software dashboard",
    jsonLd: ["Organization", "SoftwareApplication", "FAQPage"],
    lastmod: "2026-10-17",
  },
  {
    page: "privacy",
    lang: "fr",
    path: "/fr/confidentialite",
    title: "Politique de confidentialité | KimiFleet",
    description: "Comment KimiFleet collecte, utilise et protège vos données personnelles.",
    ogImageAlt: "Tableau de bord KimiFleet, logiciel de gestion de location de voitures",
    jsonLd: ["Organization"],
    lastmod: "2026-10-17",
  },
  {
    page: "privacy",
    lang: "en",
    path: "/en/privacy",
    title: "Privacy Policy | KimiFleet",
    description: "How KimiFleet collects, uses, and protects your personal data.",
    ogImageAlt: "KimiFleet car rental management software dashboard",
    jsonLd: ["Organization"],
    lastmod: "2026-10-17",
  },
];

/** Prerendered to dist/404.html and served by nginx for unknown URLs. */
export const NOT_FOUND_PATH = "/404";

/**
 * Source module of each page, used by the prerender script to find the page's JS and CSS
 * chunks in the Vite manifest. Keep in sync with the lazy() imports in App.tsx.
 */
export const PAGE_MODULES: Record<PageId | "notFound", string> = {
  home: "src/pages/Index.tsx",
  privacy: "src/pages/PrivacyPolicy.tsx",
  notFound: "src/pages/NotFound.tsx",
};

export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;

export const isLang = (value: string | undefined): value is Lang => LANGS.includes(value as Lang);

/** "/en/privacy" -> "en"; anything without a known language prefix -> DEFAULT_LANG. */
export const langFromPath = (pathname: string): Lang => {
  const first = pathname.split("/")[1];
  return isLang(first) ? first : DEFAULT_LANG;
};

const stripTrailingSlash = (path: string) => (path.length > 1 ? path.replace(/\/+$/, "") : path);

export const findRoute = (pathname: string): SeoRoute | undefined =>
  ROUTES.find((route) => stripTrailingSlash(route.path) === stripTrailingSlash(pathname));

export const pathFor = (page: PageId, lang: Lang): string => {
  const route = ROUTES.find((r) => r.page === page && r.lang === lang);
  if (!route) throw new Error(`No route for page "${page}" in "${lang}"`);
  return route.path;
};

/** The same page in every language, used for hreflang links and the language switcher. */
export const alternatesFor = (page: PageId): SeoRoute[] => ROUTES.filter((route) => route.page === page);
