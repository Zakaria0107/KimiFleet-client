// Plan prices, shared by PricingSection and the SoftwareApplication JSON-LD so they cannot drift apart.
export const PRICE_CURRENCY = "MAD";

export const PLANS = [
  { id: "plan3", nameKey: "pricing.plan3_name", price: 700, perMonth: 233, months: 3, highlighted: false },
  { id: "plan6", nameKey: "pricing.plan6_name", price: 1300, perMonth: 217, months: 6, highlighted: true },
] as const;
