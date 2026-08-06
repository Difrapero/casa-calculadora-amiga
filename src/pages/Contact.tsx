import { Mail, MessageCircleMore } from "lucide-react";
import Seo from "@/components/Seo";
import LeadForm from "@/components/LeadForm";
import { siteConfig } from "@/config/site";

const Contact = () => (
  <>
    <Seo title="Contacto" description="Contacta con Tu Hipoteca Clara o solicita una revisión de tu escenario hipotecario." path="/contacto" />
    <header className="page-hero compact"><div className="site-container narrow"><span className="eyebrow"><MessageCircleMore aria-hidden="true" /> Contacto</span><h1>Cuéntanos qué necesitas revisar</h1><p>Para estudiar un escenario, utiliza el formulario. Para privacidad, errores o cuestiones editoriales, escribe por correo.</p></div></header>
    <section className="content-section"><div className="site-container contact-grid"><div className="contact-copy"><Mail aria-hidden="true" /><h2>Contacto general</h2><a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a><p>No envíes documentos bancarios, identificativos o nóminas por correo. Primero confirmaremos un canal adecuado si fueran necesarios.</p></div><LeadForm calculation={{ tipo: "contacto_general" }} compact /></div></section>
  </>
);

export default Contact;
