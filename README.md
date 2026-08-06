# Tu Hipoteca Clara

Aplicación web para estimar cuota hipotecaria, ahorro inicial y precio máximo de compra. Incluye metodología pública, contenidos educativos, captación de solicitudes, consentimiento granular y espacios publicitarios condicionados al consentimiento.

## Funcionalidades

- Cuota hipotecaria por sistema francés, incluido interés 0 %.
- Vivienda nueva o usada, impuestos y gastos editables.
- Bonificaciones en puntos porcentuales con comparación de cuota.
- Capital, LTV, ahorro inicial, intereses y devolución total.
- Precio máximo cruzando ingresos, deudas, ahorros, gastos y financiación.
- Vista del primer año de amortización.
- Formulario de leads con cálculo, atribución UTM y consentimientos.
- Función Netlify compatible con Supabase REST o un webhook de CRM.
- Consentimiento por categorías y etiquetas de Google bloqueadas por defecto.
- Guías, metodología, sitemap, metadatos y datos estructurados.
- Diseño responsive y accesible.

## Desarrollo local

Requisitos: Node.js 22 y npm.

```bash
npm ci
cp .env.example .env.local
npm run dev
```

La aplicación funciona sin credenciales, salvo el envío real de leads y la carga de etiquetas publicitarias.

## Calidad

```bash
npm run typecheck
npm run lint
npm test
npm run build
npm run test:e2e
```

`npm run check` ejecuta typecheck, lint, pruebas unitarias y build. GitHub Actions ejecuta la misma validación en pushes y pull requests.

## Variables públicas del frontend

Copiar `.env.example` a `.env.local`:

- `VITE_GTM_ID`: contenedor de Google Tag Manager.
- `VITE_GOOGLE_ADSENSE_CLIENT`: identificador `ca-pub-*`.
- `VITE_GOOGLE_ADSENSE_CONTENT_SLOT`: slot numérico para contenido.
- `VITE_GOOGLE_ADSENSE_FOOTER_SLOT`: slot numérico inferior.
- `VITE_LEAD_ENDPOINT`: por defecto `/.netlify/functions/submit-lead`.
- `VITE_LEGAL_NAME`, `VITE_LEGAL_TAX_ID`, `VITE_LEGAL_ADDRESS`: identidad legal real.
- `VITE_CONTACT_EMAIL`: correo de contacto y ejercicio de derechos.

Todas las variables `VITE_*` son públicas en el navegador. Nunca deben contener secretos.

## Persistencia de leads

La función `netlify/functions/submit-lead.ts` utiliza la primera opción disponible:

1. Supabase mediante `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`.
2. Un webhook mediante `LEAD_WEBHOOK_URL`.

Estas variables se configuran únicamente en Netlify y no deben usar el prefijo `VITE_`.

Para Supabase:

1. Crear el proyecto.
2. Ejecutar `supabase/migrations/202608060001_create_leads.sql` en el editor SQL.
3. Configurar las dos variables seguras en Netlify.
4. Verificar un envío y definir una política interna de conservación/borrado.

La tabla tiene RLS habilitado y no expone políticas anónimas. Solo la función con service role puede insertar o consultar.

## Despliegue en Netlify

El archivo `netlify.toml` define build, publicación, funciones, headers y fallback SPA.

1. Conectar el repositorio.
2. Añadir variables de entorno.
3. Desplegar.
4. Verificar dominio y HTTPS.
5. Comprobar `/sitemap.xml`, `/robots.txt` y `/ads.txt`.

## Google, consentimiento y AdSense

El proyecto:

- define consentimiento de Google como denegado antes de cargar la aplicación;
- no inyecta GTM sin consentimiento de medición;
- no inyecta AdSense sin consentimiento publicitario;
- ofrece aceptar, rechazar y configurar;
- reserva espacio para anuncios configurados.

Antes de monetizar usuarios del EEE, Reino Unido o Suiza debe activarse una CMP certificada por Google —por ejemplo, el mensaje europeo de Google desde AdSense— y revisar la configuración TCF. El gestor incluido controla la carga técnica, pero no sustituye esa certificación.

Los slots se mantienen vacíos hasta disponer de identificadores reales. `public/ads.txt` usa el publisher encontrado originalmente en el proyecto; confirmar que pertenece a la cuenta activa.

## Información legal pendiente

Antes del despliegue público se deben configurar nombre/razón social, NIF/CIF y domicilio reales. También debe revisarse con asesoría especializada:

- identidad y destinatarios finales de los leads;
- contratos con encargados del tratamiento;
- transferencias internacionales de cada proveedor;
- plazo concreto de conservación;
- texto aplicable si los leads se ceden a terceros;
- fiscalidad utilizada en contenidos o valores predeterminados.

Los textos del repositorio son una base operativa, no asesoramiento jurídico.

## Arquitectura

- `src/lib/mortgage.ts`: cálculos financieros puros.
- `src/components/MortgageCalculator.tsx`: cuota, gastos y amortización.
- `src/components/MaxPriceCalculator.tsx`: capacidad de compra.
- `src/components/ConsentManager.tsx`: preferencias y carga de Google.
- `src/components/LeadForm.tsx`: captura y atribución.
- `netlify/functions/submit-lead.ts`: validación y persistencia servidor.
- `src/content/guides.ts`: contenido editorial.
- `supabase/migrations`: esquema privado de leads.

## Límites del producto

Los resultados son orientativos. No constituyen una oferta, aprobación bancaria ni asesoramiento financiero, jurídico o fiscal. Cada entidad puede aplicar criterios distintos y los impuestos varían por territorio y situación personal.
