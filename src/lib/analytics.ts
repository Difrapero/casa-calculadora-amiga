declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

export const trackEvent = (event: string, parameters: Record<string, unknown> = {}) => {
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...parameters });
};

export const updateGoogleConsent = (analytics: boolean, advertising: boolean) => {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag = window.gtag ?? function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: advertising ? "granted" : "denied",
    ad_user_data: advertising ? "granted" : "denied",
    ad_personalization: advertising ? "granted" : "denied",
  });
};
