import { Home } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

const NotFound = () => (
  <section className="not-found"><Seo title="Página no encontrada" description="La página solicitada no existe." path="/404" noIndex /><span>404</span><h1>Esta página no existe</h1><p>Puede que el enlace haya cambiado o tenga un error.</p><Link className="primary-link" to="/"><Home aria-hidden="true" /> Volver al inicio</Link></section>
);

export default NotFound;
