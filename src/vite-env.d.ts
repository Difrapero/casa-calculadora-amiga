/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GTM_ID?: string;
  readonly VITE_GOOGLE_ADSENSE_CLIENT?: string;
  readonly VITE_GOOGLE_ADSENSE_CONTENT_SLOT?: string;
  readonly VITE_GOOGLE_ADSENSE_FOOTER_SLOT?: string;
  readonly VITE_LEAD_ENDPOINT?: string;
  readonly VITE_LEGAL_NAME?: string;
  readonly VITE_LEGAL_TAX_ID?: string;
  readonly VITE_LEGAL_ADDRESS?: string;
  readonly VITE_CONTACT_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
