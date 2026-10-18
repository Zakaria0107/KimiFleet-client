// Outbound links and contact details used across the landing site.
export const DASHBOARD_URL = "https://kimifleet.com/dashboard/";
export const SIGNUP_URL = "https://kimifleet.com/dashboard/signup";
/** Opens signup with the plan preselected (the dashboard reads ?plan=3 or ?plan=6). */
export const signupUrlForPlan = (months: number) => `${SIGNUP_URL}?plan=${months}`;

export const WHATSAPP_URL = "https://wa.me/212773273153";
export const PHONE_TEL = "tel:+212773273153";
export const PHONE_DISPLAY = "+212 773 273 153";
