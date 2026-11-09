// Google Analytics 4 (gtag.js) for the marketing site.
//
// Setup: create a GA4 property at https://analytics.google.com, add a Web data stream for
// https://kimifleet.com, and paste its Measurement ID (G-XXXXXXXXXX) below. While the ID is empty,
// nothing is loaded. Measurement IDs are public (they ship in every page), so it is fine in git.
export const GA_MEASUREMENT_ID = "G-40KX4ZBVGR";

// Page views: GA4's Enhanced measurement ("Page changes based on browser history events", on by
// default) records client-side navigations, so no router hook is needed here.

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

/** Sends a GA4 event. Safe to call before (or without) analytics being loaded. */
export const trackEvent = (name: string, params: Record<string, unknown> = {}) => {
  window.gtag?.("event", name, params);
};

/**
 * Classifies outbound clicks into conversion events. Mark `sign_up_click` and `contact_click`
 * as Key events in GA4 (Admin > Events) to see which pages and searches bring sign-ups.
 */
const trackLinkClicks = () => {
  document.addEventListener(
    "click",
    (event) => {
      const link = (event.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.href;
      const params = { link_url: href, link_text: link.textContent?.trim().slice(0, 100), page_path: location.pathname };

      if (href.includes("/dashboard/signup")) {
        trackEvent("sign_up_click", { ...params, plan: new URL(href).searchParams.get("plan") ?? undefined });
      } else if (href.includes("/dashboard/")) {
        trackEvent("login_click", params);
      } else if (href.startsWith("https://wa.me/")) {
        trackEvent("contact_click", { ...params, method: "whatsapp" });
      } else if (href.startsWith("tel:")) {
        trackEvent("contact_click", { ...params, method: "phone" });
      } else if (href.startsWith("mailto:")) {
        trackEvent("contact_click", { ...params, method: "email" });
      }
    },
    { capture: true },
  );
};

/** Loads gtag.js after the page has loaded so it never competes with the hero image (LCP). */
export const initAnalytics = () => {
  if (!GA_MEASUREMENT_ID || typeof window === "undefined" || window.gtag) return;
  // Local development and previews should not pollute production data.
  if (!/(^|\.)kimifleet\.com$/.test(location.hostname)) return;

  window.dataLayer = window.dataLayer || [];
  // gtag.js expects the `arguments` object, not an array.
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID, { content_group: location.pathname.split("/")[1] || "fr" });
  trackLinkClicks();

  const load = () => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
  };
  if (document.readyState === "complete") load();
  else window.addEventListener("load", load, { once: true });
};
