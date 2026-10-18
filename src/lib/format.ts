// Number formatting per page language: French "8 420,50" and "84,2 %", English "8,420.50" and "84.2%".
// Intl gives the same output in Node (prerendering) and in browsers, so hydration matches.
const locale = (lang: string) => (lang.startsWith("fr") ? "fr-FR" : "en-US");

export const formatAmount = (value: number, lang: string) =>
  new Intl.NumberFormat(locale(lang), { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);

/** Whole numbers: 1300 -> "1 300" / "1,300". */
export const formatNumber = (value: number, lang: string) => new Intl.NumberFormat(locale(lang)).format(value);

/** `value` is a fraction: 0.842 -> "84,2 %" / "84.2%". `signed` adds a "+" to positive values. */
export const formatPercent = (value: number, lang: string, { signed = false } = {}) =>
  new Intl.NumberFormat(locale(lang), {
    style: "percent",
    maximumFractionDigits: 1,
    ...(signed ? { signDisplay: "exceptZero" as const } : {}),
  }).format(value);
