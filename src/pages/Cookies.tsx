import LegalPage from "@/components/LegalPage";
import { useConsent } from "@/components/ConsentManager";
import { Button } from "@/components/ui/button";

const Cookies = () => {
  const { openSettings } = useConsent();
  return (
    <LegalPage title="Política de cookies" description="Cookies, almacenamiento local, medición y publicidad en Tu Hipoteca Clara." path="/cookies" updated="6 de agosto de 2026">
      <h2>Qué utilizamos</h2><p>El sitio utiliza almacenamiento local necesario para recordar tus preferencias de privacidad. Solo activamos medición o publicidad cuando eliges permitir esas categorías.</p>
      <h2>Categorías</h2><div className="cookie-table"><div><strong>Necesarias</strong><span>Preferencias de privacidad y funcionamiento básico.</span><em>Siempre activas</em></div><div><strong>Medición</strong><span>Comprender uso, errores y conversiones agregadas mediante las etiquetas configuradas en Google Tag Manager.</span><em>Opcional</em></div><div><strong>Publicidad</strong><span>Solicitar y medir anuncios de Google AdSense cuando el servicio esté configurado.</span><em>Opcional</em></div></div>
      <h2>Gestión del consentimiento</h2><p>Puedes aceptar, rechazar o seleccionar categorías. La decisión queda registrada localmente con una versión y fecha. Puedes cambiarla en cualquier momento desde el pie de página.</p>
      <Button onClick={openSettings}>Revisar preferencias</Button>
      <h2>Proveedores</h2><p>Cuando se activen, Google Tag Manager y Google AdSense pueden utilizar tecnologías propias según la configuración del sitio y la elección realizada. Antes de servir publicidad personalizada en las regiones en las que sea obligatorio se habilitará una plataforma de gestión del consentimiento certificada por Google.</p>
      <h2>Cómo borrar el almacenamiento</h2><p>Además del panel, puedes eliminar cookies y almacenamiento desde la configuración de tu navegador. Al hacerlo volveremos a solicitar tus preferencias.</p>
    </LegalPage>
  );
};

export default Cookies;
