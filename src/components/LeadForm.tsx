import { useMemo, useState } from "react";
import { CheckCircle2, Loader2, LockKeyhole, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { trackEvent } from "@/lib/analytics";
import { siteConfig } from "@/config/site";

interface LeadFormProps {
  calculation?: Record<string, string | number>;
  compact?: boolean;
}

type SubmitState = "idle" | "submitting" | "success";

const getAttribution = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source"),
    utm_medium: params.get("utm_medium"),
    utm_campaign: params.get("utm_campaign"),
    utm_content: params.get("utm_content"),
    landing_page: window.location.pathname,
    referrer: document.referrer || null,
  };
};

const LeadForm = ({ calculation = {}, compact = false }: LeadFormProps) => {
  const [state, setState] = useState<SubmitState>("idle");
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [marketingAccepted, setMarketingAccepted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const attribution = useMemo(getAttribution, []);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!privacyAccepted || state === "submitting") return;

    setState("submitting");
    setFormError(null);
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      province: String(formData.get("province") || "").trim(),
      preferredContact: String(formData.get("preferredContact") || "phone"),
      website: String(formData.get("website") || ""),
      privacyAccepted,
      marketingAccepted,
      consentVersion: "2026-08-06-v1",
      calculation,
      attribution,
      submittedAt: new Date().toISOString(),
    };

    trackEvent("lead_form_submit_started", { calculator_type: calculation.tipo ?? "unknown" });

    try {
      const response = await fetch(import.meta.env.VITE_LEAD_ENDPOINT || "/.netlify/functions/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const responseBody = await response.json().catch(() => null) as { error?: string } | null;
      if (!response.ok) throw new Error(responseBody?.error || "No hemos podido guardar la solicitud.");

      setState("success");
      trackEvent("lead_submitted", { calculator_type: calculation.tipo ?? "unknown" });
      toast({ title: "Solicitud recibida", description: "Te contactaremos según la preferencia indicada." });
    } catch (error) {
      const message = error instanceof Error ? error.message : "No se pudo enviar. Inténtalo de nuevo.";
      setFormError(message);
      setState("idle");
      trackEvent("lead_submit_error", { message });
    }
  };

  if (state === "success") {
    return (
      <Card className="lead-success" aria-live="polite">
        <CheckCircle2 aria-hidden="true" />
        <h3>Solicitud guardada</h3>
        <p>Gracias. Revisaremos los datos de tu simulación y te contactaremos próximamente.</p>
        <Button variant="outline" type="button" onClick={() => setState("idle")}>Enviar otra solicitud</Button>
      </Card>
    );
  }

  return (
    <Card className={`lead-card ${compact ? "lead-card-compact" : ""}`}>
      <div className="lead-card-badge"><LockKeyhole aria-hidden="true" /> Datos protegidos</div>
      <h3>Revisa tu caso con una persona</h3>
      <p>Enviaremos también el resumen de tu cálculo para que no tengas que repetir los datos.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="lead-form-grid">
          <div className="field-group">
            <Label htmlFor="lead-name">Nombre y apellidos</Label>
            <Input id="lead-name" name="name" autoComplete="name" required minLength={2} maxLength={100} />
          </div>
          <div className="field-group">
            <Label htmlFor="lead-email">Correo electrónico</Label>
            <Input id="lead-email" name="email" type="email" autoComplete="email" required maxLength={255} />
          </div>
          <div className="field-group">
            <Label htmlFor="lead-phone">Teléfono</Label>
            <Input id="lead-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" required minLength={9} maxLength={20} pattern="[+0-9 ()-]{9,20}" />
          </div>
          <div className="field-group">
            <Label htmlFor="lead-province">Provincia</Label>
            <Input id="lead-province" name="province" autoComplete="address-level2" required maxLength={80} />
          </div>
          <div className="field-group field-wide">
            <Label htmlFor="preferred-contact">Preferencia de contacto</Label>
            <select id="preferred-contact" name="preferredContact" className="native-select" defaultValue="phone">
              <option value="phone">Llamada telefónica</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="email">Correo electrónico</option>
            </select>
          </div>
        </div>

        <div className="honeypot" aria-hidden="true">
          <Label htmlFor="website">No rellenar</Label>
          <Input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </div>

        <label className="consent-checkbox">
          <Checkbox required checked={privacyAccepted} onCheckedChange={(checked) => setPrivacyAccepted(Boolean(checked))} />
          <span>Solicito que me contacten para atender esta petición y he leído la <Link to="/privacidad">información de privacidad</Link>.</span>
        </label>
        <label className="consent-checkbox">
          <Checkbox checked={marketingAccepted} onCheckedChange={(checked) => setMarketingAccepted(Boolean(checked))} />
          <span>Acepto recibir información comercial relacionada con hipotecas. Opcional.</span>
        </label>

        <p className="privacy-layer">
          Responsable: {siteConfig.legalName}. Finalidad: responder a tu solicitud. Base: medidas precontractuales solicitadas por ti; consentimiento para comunicaciones opcionales. Puedes ejercer tus derechos en {siteConfig.contactEmail}.
        </p>

        {formError && <p className="form-error" role="alert">{formError}</p>}
        <Button type="submit" size="lg" className="w-full" disabled={!privacyAccepted || state === "submitting"}>
          {state === "submitting" ? <><Loader2 className="animate-spin" aria-hidden="true" /> Guardando solicitud…</> : <><Send aria-hidden="true" /> Solicitar revisión gratuita</>}
        </Button>
      </form>
    </Card>
  );
};

export default LeadForm;
