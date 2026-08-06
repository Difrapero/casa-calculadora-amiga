import LegalPage from "@/components/LegalPage";
import { siteConfig } from "@/config/site";

const Privacy = () => (
  <LegalPage title="Política de privacidad" description="Cómo tratamos los datos personales enviados a Tu Hipoteca Clara." path="/privacidad" updated="6 de agosto de 2026">
    <h2>Responsable del tratamiento</h2><p>{siteConfig.legalName}, con contacto en <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. Los datos identificativos completos figuran en el aviso legal.</p>
    <h2>Datos que tratamos</h2><p>Cuando solicitas contacto podemos recibir nombre, correo, teléfono, provincia, preferencia de contacto, datos resumidos de la simulación, página de origen, parámetros de campaña y registro del consentimiento. Las calculadoras funcionan en el navegador y sus datos no se guardan por el mero hecho de calcular.</p>
    <h2>Finalidades y bases jurídicas</h2>
    <ul><li>Responder a la solicitud y valorar el escenario remitido: aplicación de medidas precontractuales solicitadas por la persona interesada.</li><li>Enviar comunicaciones comerciales relacionadas: consentimiento opcional y separado, que puede retirarse en cualquier momento.</li><li>Proteger el formulario frente a fraude y abuso: interés legítimo en mantener la seguridad del servicio.</li><li>Medición y publicidad: consentimiento gestionado desde el panel de privacidad.</li></ul>
    <h2>Destinatarios y proveedores</h2><p>Los datos pueden ser tratados por proveedores de alojamiento, base de datos, correo o CRM bajo el correspondiente encargo de tratamiento. No se cederán leads a intermediarios o terceros para que contacten por cuenta propia sin informar previamente de su identidad, finalidad y base jurídica.</p>
    <h2>Transferencias internacionales</h2><p>Algunos proveedores tecnológicos pueden tratar datos fuera del Espacio Económico Europeo. Cuando corresponda, se utilizarán mecanismos reconocidos por la normativa aplicable y se informará en la configuración o documentación del proveedor.</p>
    <h2>Conservación</h2><p>Las solicitudes no cualificadas se revisarán y eliminarán según la política interna de conservación. Los datos necesarios para atender una solicitud se conservarán mientras esté activa y posteriormente durante los plazos exigibles. Los consentimientos comerciales se conservarán hasta su retirada o mientras resulte necesario acreditar su gestión.</p>
    <h2>Derechos</h2><p>Puedes solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad escribiendo a <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>. También puedes reclamar ante la Agencia Española de Protección de Datos.</p>
    <h2>Seguridad</h2><p>Aplicamos minimización, validación del lado servidor y acceso restringido a la base de datos. Ningún sistema es completamente infalible; revisamos las medidas cuando cambia el servicio.</p>
  </LegalPage>
);

export default Privacy;
