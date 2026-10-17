import i18next, { type i18n as I18n } from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslation from "./locales/en.json";
import frTranslation from "./locales/fr.json";
import { DEFAULT_LANG, type Lang } from "./seo/routes";

// Arabic (locales/ar.json) is not served yet: it needs its own /ar/ URLs and RTL prerendering.
const resources = {
  fr: { translation: frTranslation },
  en: { translation: enTranslation },
};

/**
 * The language comes from the URL (/fr/..., /en/...), never from browser storage, so the
 * prerendered HTML and the hydrated page always agree. One instance per render.
 */
export const createI18n = (lng: Lang): I18n => {
  const instance = i18next.createInstance();
  instance.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: DEFAULT_LANG,
    interpolation: {
      escapeValue: false,
    },
    initAsync: false,
  });
  return instance;
};
