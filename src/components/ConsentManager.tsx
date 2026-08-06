import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Cookie, Settings2, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { updateGoogleConsent } from "@/lib/analytics";

const CONSENT_KEY = "thc_consent_v2";
const CONSENT_VERSION = 2;

export interface ConsentPreferences {
  necessary: true;
  analytics: boolean;
  advertising: boolean;
  version: number;
  updatedAt: string;
}

interface ConsentContextValue {
  preferences: ConsentPreferences | null;
  openSettings: () => void;
}

const ConsentContext = createContext<ConsentContextValue | null>(null);

const makePreferences = (analytics: boolean, advertising: boolean): ConsentPreferences => ({
  necessary: true,
  analytics,
  advertising,
  version: CONSENT_VERSION,
  updatedAt: new Date().toISOString(),
});

export const ConsentProvider = ({ children }: { children: ReactNode }) => {
  const [preferences, setPreferences] = useState<ConsentPreferences | null>(() => {
    try {
      const stored = window.localStorage.getItem(CONSENT_KEY);
      if (!stored) return null;
      const parsed = JSON.parse(stored) as ConsentPreferences;
      return parsed.version === CONSENT_VERSION ? parsed : null;
    } catch {
      return null;
    }
  });
  const [visible, setVisible] = useState(() => preferences === null);
  const [customizing, setCustomizing] = useState(false);
  const [analytics, setAnalytics] = useState(preferences?.analytics ?? false);
  const [advertising, setAdvertising] = useState(preferences?.advertising ?? false);

  useEffect(() => {
    updateGoogleConsent(Boolean(preferences?.analytics), Boolean(preferences?.advertising));
  }, [preferences]);

  const save = (next: ConsentPreferences) => {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(next));
    setPreferences(next);
    setVisible(false);
    setCustomizing(false);
  };

  const value = useMemo<ConsentContextValue>(() => ({
    preferences,
    openSettings: () => {
      setAnalytics(preferences?.analytics ?? false);
      setAdvertising(preferences?.advertising ?? false);
      setCustomizing(true);
      setVisible(true);
    },
  }), [preferences]);

  return (
    <ConsentContext.Provider value={value}>
      {children}
      {visible && (
        <div className="consent-backdrop" role="presentation">
          <section className="consent-panel" role="dialog" aria-modal="true" aria-labelledby="consent-title">
            <div className="consent-icon"><Cookie aria-hidden="true" /></div>
            <div className="consent-content">
              <h2 id="consent-title">Tu privacidad, bajo tu control</h2>
              {!customizing ? (
                <p>
                  Usamos almacenamiento necesario para que la web funcione. Con tu permiso, también utilizamos medición y publicidad para mejorar y financiar el servicio. Puedes aceptar, rechazar o configurar con la misma facilidad. Consulta la <Link to="/cookies">política de cookies</Link>.
                </p>
              ) : (
                <div className="consent-options">
                  <div>
                    <div><ShieldCheck aria-hidden="true" /><Label>Necesarias</Label></div>
                    <Switch checked disabled aria-label="Cookies necesarias siempre activas" />
                  </div>
                  <div>
                    <div><Settings2 aria-hidden="true" /><Label htmlFor="analytics-consent">Medición y analítica</Label></div>
                    <Switch id="analytics-consent" checked={analytics} onCheckedChange={setAnalytics} />
                  </div>
                  <div>
                    <div><Cookie aria-hidden="true" /><Label htmlFor="advertising-consent">Publicidad</Label></div>
                    <Switch id="advertising-consent" checked={advertising} onCheckedChange={setAdvertising} />
                  </div>
                </div>
              )}
            </div>
            <div className="consent-actions">
              {!customizing && <Button variant="outline" onClick={() => setCustomizing(true)}>Configurar</Button>}
              <Button variant="outline" onClick={() => save(makePreferences(false, false))}>Rechazar</Button>
              {customizing ? (
                <Button onClick={() => save(makePreferences(analytics, advertising))}>Guardar selección</Button>
              ) : (
                <Button onClick={() => save(makePreferences(true, true))}>Aceptar</Button>
              )}
            </div>
          </section>
        </div>
      )}
    </ConsentContext.Provider>
  );
};
export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (!context) throw new Error("useConsent debe usarse dentro de ConsentProvider.");
  return context;
};

export const MarketingScripts = () => {
  const { preferences } = useConsent();

  useEffect(() => {
    if (!preferences?.analytics) return;
    const gtmId = import.meta.env.VITE_GTM_ID;
    if (!gtmId || document.querySelector(`script[data-gtm-id="${gtmId}"]`)) return;
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
    const script = document.createElement("script");
    script.async = true;
    script.dataset.gtmId = gtmId;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
  }, [preferences?.analytics]);

  useEffect(() => {
    if (!preferences?.advertising) return;
    const client = import.meta.env.VITE_GOOGLE_ADSENSE_CLIENT;
    if (!client || document.querySelector("script[data-adsense-client]")) return;
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.dataset.adsenseClient = client;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(client)}`;
    document.head.appendChild(script);
  }, [preferences?.advertising]);

  return null;
};
