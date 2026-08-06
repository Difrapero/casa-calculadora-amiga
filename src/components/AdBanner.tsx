import { useEffect } from "react";
import { useConsent } from "./ConsentManager";

interface AdBannerProps {
  placement: "content" | "footer";
  className?: string;
}

const AdBanner = ({ placement, className = "" }: AdBannerProps) => {
  const { preferences } = useConsent();
  const client = import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT;
  const slot = placement === "content"
    ? import.meta.env.VITE_GOOGLE_ADSENSE_CONTENT_SLOT
    : import.meta.env.VITE_GOOGLE_ADSENSE_FOOTER_SLOT;

  useEffect(() => {
    if (!preferences?.advertising || !client || !slot) return;
    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch (error) {
      if (import.meta.env.DEV) console.warn("AdSense todavía no está disponible", error);
    }
  }, [preferences?.advertising, client, slot]);

  if (!preferences?.advertising || !client || !slot) {
    return import.meta.env.DEV ? (
      <aside className={`ad-placeholder ${className}`} aria-label="Espacio publicitario de desarrollo">
        <span>Publicidad</span>
        <p>El anuncio aparecerá aquí cuando existan consentimiento e identificadores válidos.</p>
      </aside>
    ) : null;
  }

  return (
    <aside className={`ad-container ${className}`} aria-label="Publicidad">
      <span className="ad-label">Publicidad</span>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
};

export default AdBanner;
