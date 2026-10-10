/**
 * Thin analytics wrapper. Uses GA4 (gtag) when NEXT_PUBLIC_GA_ID is set,
 * otherwise does nothing. Keep event names stable: reports depend on them.
 */
export type AnalyticsEvent =
  | "cta_click"
  | "volunteer_application_submitted"
  | "school_enquiry_submitted"
  | "partner_enquiry_submitted"
  | "item_donation_enquiry_submitted"
  | "donate_start"
  | "donate_complete"
  | "bank_details_copied"
  | "social_click";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(event: AnalyticsEvent, params: Params = {}): void {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, params);
  } catch {
    // Analytics must never break the page.
  }
}
