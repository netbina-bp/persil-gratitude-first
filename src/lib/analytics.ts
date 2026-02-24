const MEASUREMENT_ID = "G-9L0SQPS36L";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function sendPageView(pagePath: string): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", MEASUREMENT_ID, { page_path: pagePath });
  }
}

export function sendEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
}
