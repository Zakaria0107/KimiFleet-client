// Single source of truth for the public marketing routes.
// Drives the React routes, the prerender script, per-page <head> tags, JSON-LD and sitemap.xml.

export const SITE_URL = "https://kimifleet.com";

export const LANGS = ["fr", "en"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "fr";

export const OG_LOCALES: Record<Lang, string> = { fr: "fr_FR", en: "en_US" };

/** Social share image per language (1200x630, text in that language). */
export const OG_IMAGES: Record<Lang, { url: string; width: number; height: number; type: string }> = {
  fr: { url: `${SITE_URL}/og/fr.jpg`, width: 1200, height: 630, type: "image/jpeg" },
  en: { url: `${SITE_URL}/og/en.jpg`, width: 1200, height: 630, type: "image/jpeg" },
};

export type PageId = "home" | "privacy" | "bookingWebsite" | "moroccoSoftware" | "digitalContract" | "pricing";

/** Pages rendered by ContentPage from the `pages.<id>` content in src/locales/pages.<lang>.json. */
export const CONTENT_PAGES = ["bookingWebsite", "moroccoSoftware", "digitalContract", "pricing"] as const;
export type JsonLdType = "Organization" | "SoftwareApplication" | "FAQPage" | "BreadcrumbList";

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
      "Logiciel de gestion pour agences de location de voitures au Maroc : contrats signés par QR code, réservations, entretien et facturation. Créez votre compte.",
    ogImageAlt: "KimiFleet, logiciel de gestion de location de voitures",
    jsonLd: ["Organization", "SoftwareApplication", "FAQPage"],
    lastmod: "2026-10-18",
  },
  {
    page: "home",
    lang: "en",
    path: "/en/",
    title: "Car Rental Management Software | KimiFleet",
    description:
      "Car rental management software for rental agencies: QR-signed digital contracts, bookings, vehicle maintenance and invoicing in one place. Create your account.",
    ogImageAlt: "KimiFleet car rental management software",
    jsonLd: ["Organization", "SoftwareApplication", "FAQPage"],
    lastmod: "2026-10-18",
  },
  {
    page: "privacy",
    lang: "fr",
    path: "/fr/confidentialite",
    title: "Politique de confidentialité | KimiFleet",
    description: "Comment KimiFleet collecte, utilise et protège vos données personnelles.",
    ogImageAlt: "KimiFleet, logiciel de gestion de location de voitures",
    jsonLd: ["Organization"],
    lastmod: "2026-10-17",
  },
  {
    page: "privacy",
    lang: "en",
    path: "/en/privacy",
    title: "Privacy Policy | KimiFleet",
    description: "How KimiFleet collects, uses, and protects your personal data.",
    ogImageAlt: "KimiFleet car rental management software",
    jsonLd: ["Organization"],
    lastmod: "2026-10-17",
  },

  {
    page: "bookingWebsite",
    lang: "fr",
    path: "/fr/fonctionnalites/site-de-reservation",
    title: "Site de réservation pour location de voiture | KimiFleet",
    description:
      "Votre site de réservation en ligne inclus : catalogue de vos véhicules, demandes de réservation et comptes clients, en français, anglais et arabe.",
    ogImageAlt: "KimiFleet, logiciel de gestion de location de voitures",
    jsonLd: ["Organization", "BreadcrumbList", "FAQPage"],
    lastmod: "2026-10-18",
  },
  {
    page: "bookingWebsite",
    lang: "en",
    path: "/en/features/car-rental-booking-website",
    title: "Car Rental Booking Website for Agencies | KimiFleet",
    description:
      "Your car rental agency's booking website, included with KimiFleet: your fleet online, booking requests and customer accounts in 3 languages.",
    ogImageAlt: "KimiFleet car rental management software",
    jsonLd: ["Organization", "BreadcrumbList", "FAQPage"],
    lastmod: "2026-10-18",
  },
  {
    page: "moroccoSoftware",
    lang: "fr",
    path: "/fr/logiciel-location-voiture-maroc",
    title: "Logiciel de location de voiture au Maroc | KimiFleet",
    description:
      "Logiciel de gestion conçu pour les agences de location de voitures au Maroc : prix en MAD, contrats signés par QR code, multi-agences, en français et arabe.",
    ogImageAlt: "KimiFleet, logiciel de gestion de location de voitures",
    jsonLd: ["Organization", "BreadcrumbList", "FAQPage"],
    lastmod: "2026-10-18",
  },
  {
    page: "moroccoSoftware",
    lang: "en",
    path: "/en/car-rental-software-morocco",
    title: "Car Rental Software for Morocco | KimiFleet",
    description:
      "Rental management software built for car rental agencies in Morocco: prices in MAD, QR-signed agreements, multi-branch, in French, Arabic and English.",
    ogImageAlt: "KimiFleet car rental management software",
    jsonLd: ["Organization", "BreadcrumbList", "FAQPage"],
    lastmod: "2026-10-18",
  },
  {
    page: "digitalContract",
    lang: "fr",
    path: "/fr/fonctionnalites/contrat-de-location-digital",
    title: "Contrat de location voiture digital signé par QR | KimiFleet",
    description:
      "Faites signer vos contrats de location de voiture sur le téléphone du client, par QR code. Signature enregistrée avec la location, sans papier.",
    ogImageAlt: "KimiFleet, logiciel de gestion de location de voitures",
    jsonLd: ["Organization", "BreadcrumbList", "FAQPage"],
    lastmod: "2026-10-18",
  },
  {
    page: "digitalContract",
    lang: "en",
    path: "/en/features/digital-rental-agreement",
    title: "Digital Car Rental Agreement with QR Signature | KimiFleet",
    description:
      "Have car rental agreements signed on the customer's phone via QR code. The signature is saved with the rental, with no paperwork.",
    ogImageAlt: "KimiFleet car rental management software",
    jsonLd: ["Organization", "BreadcrumbList", "FAQPage"],
    lastmod: "2026-10-18",
  },
  {
    page: "pricing",
    lang: "fr",
    path: "/fr/tarifs",
    title: "Tarifs du logiciel de location de voiture | KimiFleet",
    description:
      "Tarifs KimiFleet en dirhams : 700 MAD pour 3 mois ou 1 300 MAD pour 6 mois. Agences, véhicules et contrats illimités, toutes les fonctionnalités incluses.",
    ogImageAlt: "KimiFleet, logiciel de gestion de location de voitures",
    jsonLd: ["Organization", "SoftwareApplication", "BreadcrumbList", "FAQPage"],
    lastmod: "2026-10-18",
  },
  {
    page: "pricing",
    lang: "en",
    path: "/en/pricing",
    title: "Car Rental Software Pricing in MAD | KimiFleet",
    description:
      "KimiFleet pricing in dirhams: 700 MAD for 3 months or 1,300 MAD for 6 months. Unlimited branches, vehicles and agreements, every feature included.",
    ogImageAlt: "KimiFleet car rental management software",
    jsonLd: ["Organization", "SoftwareApplication", "BreadcrumbList", "FAQPage"],
    lastmod: "2026-10-18",
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
  bookingWebsite: "src/pages/ContentPage.tsx",
  moroccoSoftware: "src/pages/ContentPage.tsx",
  digitalContract: "src/pages/ContentPage.tsx",
  pricing: "src/pages/ContentPage.tsx",
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
