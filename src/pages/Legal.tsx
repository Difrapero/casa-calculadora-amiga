import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

const Legal = () => (
  <LegalPage title="Aviso legal" description="Información legal y condiciones de uso de Tu Hipoteca Clara." path="/aviso-legal" updated="6 de agosto de 2026">
    <h2>Identificación del titular</h2>
    <dl className="legal-data"><div><dt>Titular</dt><dd>{siteConfig.legalName}</dd></div><div><dt>NIF/CIF</dt><dd>{siteConfig.legalTaxId}</dd></div><div><dt>Domicilio</dt><dd>{siteConfig.legalAddress}</dd></div><div><dt>Contacto</dt><dd><a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a></dd></div><div><dt>Dominio</dt><dd>{siteConfig.domain}</dd></div></dl>
    <h2>Objeto del sitio</h2><p>El sitio ofrece calculadoras y contenidos informativos para ayudar a comprender conceptos relacionados con la compraventa y financiación de vivienda. No somos una entidad financiera y el uso del sitio no crea una relación de asesoramiento financiero, jurídico o fiscal.</p>
    <h2>Carácter orientativo</h2><p>Los resultados dependen de los datos introducidos y de hipótesis simplificadas. No constituyen una oferta, una aprobación de financiación ni una recomendación personalizada. Los impuestos, gastos, criterios bancarios y condiciones contractuales pueden variar.</p>
    <h2>Uso responsable</h2><p>La persona usuaria se compromete a utilizar el sitio de forma lícita y a no interferir con su seguridad o funcionamiento. No debe introducir datos de terceros sin autorización.</p>
    <h2>Propiedad intelectual</h2><p>Salvo indicación contraria, el diseño, código y contenidos originales del sitio pertenecen al titular o se utilizan bajo sus licencias correspondientes. Se permite enlazar a contenidos públicos sin alterar su sentido ni atribuirnos respaldo inexistente.</p>
    <h2>Enlaces y servicios de terceros</h2><p>El sitio puede enlazar a recursos externos o utilizar proveedores técnicos. No controlamos de forma permanente sus contenidos o disponibilidad. Cada proveedor aplica sus propios términos y políticas.</p>
  </LegalPage>
);

export default Legal;
