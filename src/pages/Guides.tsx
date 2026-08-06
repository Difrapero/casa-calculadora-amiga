import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";
import AdBanner from "@/components/AdBanner";
import { guides } from "@/content/guides";

const Guides = () => (
  <>
    <Seo title="Guías hipotecarias" description="Guías claras sobre cuota, TIN, TAE, gastos de compraventa, ahorro y capacidad de compra." path="/guias" />
    <header className="page-hero"><div className="site-container narrow"><span className="eyebrow"><BookOpen aria-hidden="true" /> Educación financiera</span><h1>Guías para decidir con más contexto</h1><p>Explicaciones prácticas, hipótesis visibles y ninguna promesa de aprobación.</p></div></header>
    <section className="content-section"><div className="site-container guide-index-grid">
      {guides.map((guide, index) => (
        <article key={guide.slug} className="guide-index-card">
          <span className="guide-number">{String(index + 1).padStart(2, "0")}</span>
          <div className="article-meta"><Clock3 aria-hidden="true" /> {guide.readingTime} · Actualizada {guide.updatedAt}</div>
          <h2>{guide.title}</h2><p>{guide.description}</p>
          <Link to={`/guias/${guide.slug}`}>Leer guía <ArrowRight aria-hidden="true" /></Link>
        </article>
      ))}
    </div></section>
    <div className="site-container"><AdBanner placement="content" /></div>
  </>
);

export default Guides;
