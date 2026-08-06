import { HeartHandshake, ShieldCheck, Target } from "lucide-react";
import Seo from "@/components/Seo";

const About = () => (
  <>
    <Seo title="Sobre nosotros" description="Propósito y principios editoriales de Tu Hipoteca Clara." path="/sobre-nosotros" />
    <header className="page-hero"><div className="site-container narrow"><span className="eyebrow">El proyecto</span><h1>Menos opacidad en una decisión enorme</h1><p>Tu Hipoteca Clara nace para convertir cálculos financieros en preguntas que cualquier persona pueda revisar.</p></div></header>
    <section className="content-section"><div className="site-container values-grid"><div><Target aria-hidden="true" /><h2>Misión</h2><p>Ayudar a estimar el coste y la viabilidad de una compra antes de entregar datos o iniciar una negociación.</p></div><div><ShieldCheck aria-hidden="true" /><h2>Principio editorial</h2><p>No ocultamos hipótesis ni presentamos una simulación como aprobación, asesoramiento u oferta vinculante.</p></div><div><HeartHandshake aria-hidden="true" /><h2>Modelo responsable</h2><p>La publicidad financia contenido; las solicitudes de contacto son voluntarias, contextualizadas y separadas del cálculo.</p></div></div></section>
    <section className="content-section muted-section"><div className="site-container article-width prose-block"><h2>Cómo trabajamos</h2><p>Los cálculos se mantienen en funciones independientes de la interfaz y cuentan con pruebas automatizadas. Los contenidos indican su fecha de revisión y enlazan fuentes cuando resulta útil. Evitamos testimonios, cifras de éxito o comparaciones comerciales que no podamos acreditar.</p><h2>Independencia y monetización</h2><p>La presencia de un anuncio no implica recomendación. Las ubicaciones publicitarias se identifican y se mantienen alejadas de controles y resultados. Si en el futuro colaboramos con intermediarios, identificaremos claramente la relación y no alteraremos la fórmula para favorecer ofertas.</p><h2>Límites</h2><p>No sustituimos la revisión de documentación, fiscalidad o solvencia por profesionales y entidades competentes. Nuestro objetivo es que llegues a esas conversaciones con mejores números y preguntas.</p></div></section>
  </>
);

export default About;
