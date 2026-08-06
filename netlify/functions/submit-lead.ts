interface LeadPayload {
  name?: string;
  email?: string;
  phone?: string;
  province?: string;
  preferredContact?: string;
  website?: string;
  privacyAccepted?: boolean;
  marketingAccepted?: boolean;
  consentVersion?: string;
  calculation?: Record<string, unknown>;
  attribution?: Record<string, unknown>;
  submittedAt?: string;
}

const json = (status: number, body: Record<string, unknown>) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  },
});

const clean = (value: unknown, maxLength: number) => String(value ?? "").trim().slice(0, maxLength);

export default async (request: Request) => {
  if (request.method !== "POST") return json(405, { error: "Método no permitido." });

  let payload: LeadPayload;
  try {
    payload = await request.json() as LeadPayload;
  } catch {
    return json(400, { error: "Solicitud no válida." });
  }

  if (payload.website) return json(202, { ok: true });

  const lead = {
    name: clean(payload.name, 100),
    email: clean(payload.email, 255).toLowerCase(),
    phone: clean(payload.phone, 20),
    province: clean(payload.province, 80),
    preferred_contact: clean(payload.preferredContact, 20),
    privacy_accepted: payload.privacyAccepted === true,
    marketing_accepted: payload.marketingAccepted === true,
    consent_version: clean(payload.consentVersion, 50),
    consent_at: new Date().toISOString(),
    calculation: payload.calculation ?? {},
    attribution: payload.attribution ?? {},
    source_submitted_at: clean(payload.submittedAt, 40) || null,
    status: "new",
  };

  if (lead.name.length < 2 || !/^\S+@\S+\.\S+$/.test(lead.email) || lead.phone.length < 9 || !lead.province || !lead.privacy_accepted) {
    return json(422, { error: "Completa los campos obligatorios y acepta la información de privacidad." });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const webhookUrl = process.env.LEAD_WEBHOOK_URL;

  try {
    if (supabaseUrl && supabaseServiceKey) {
      const response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/leads`, {
        method: "POST",
        headers: {
          apikey: supabaseServiceKey,
          authorization: `Bearer ${supabaseServiceKey}`,
          "content-type": "application/json",
          prefer: "return=minimal",
        },
        body: JSON.stringify(lead),
      });
      if (!response.ok) throw new Error(`Supabase respondió ${response.status}`);
    } else if (webhookUrl) {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!response.ok) throw new Error(`El webhook respondió ${response.status}`);
    } else {
      console.error("Lead storage is not configured");
      return json(503, { error: "El sistema de solicitudes todavía no está configurado." });
    }
  } catch (error) {
    console.error("Lead submission failed", error);
    return json(502, { error: "No hemos podido guardar la solicitud. Inténtalo de nuevo en unos minutos." });
  }

  return json(201, { ok: true });
};
