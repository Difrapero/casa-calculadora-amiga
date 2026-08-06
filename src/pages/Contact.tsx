import { MessageCircleMore } from "lucide-react";
import Seo from "@/components/Seo";
import LeadForm from "@/components/LeadForm";

const Contact = () => (
  <>
    <Seo title="Contacto" description="Contacta con Tu Hipoteca Clara o solicita una revisión de tu escenario hipotecario." path="/contacto" />
    <header className="page-hero compact"><div className="site-container narrow"><span className="eyebrow"><MessageCircleMore aria-hidden="true" /> Contacto</span><h1>Cuéntanos qué necesitas revisar</h1><p>Utiliza el formulario para consultas sobre tu escenario hipotecario, privacidad, errores o cuestiones editoriales.</p></div></header>
    <section className="content-section"><div className="site-container narrow"><LeadForm calculation={{ tipo: "contacto_general" }} compact /></div></section>
  </>
);

export default Contact;
