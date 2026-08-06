import { ArrowLeft, Calculator, Clock3 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import Seo from "@/components/Seo";
import AdBanner from "@/components/AdBanner";
import { findGuide } from "@/content/guides";

const GuideArticle = () => {
  const { slug } = useParams();
  const guide = findGuide(slug);
  if (!guide) return <Navigate to="/404" replace />;

  return (
    <>
      <Seo title={guide.title} description={guide.description} path={`/guias/${guide.slug}`} type="article" />
      <article className="article-page">
        <header className="article-header"><div className="site-container article-width">
          <Link to="/guias" className="back-link"><ArrowLeft aria-hidden="true" /> Todas las guías</Link>
          <div className="article-meta"><Clock3 aria-hidden="true" /> {guide.readingTime} · Actualizada {guide.updatedAt}</div>
          <h1>{guide.title}</h1><p>{guide.description}</p>
        </div></header>
        <div className="site-container article-layout">
          <div className="article-content">
            <aside className="article-disclaimer">Contenido educativo y orientativo. Verifica impuestos, costes y condiciones aplicables a tu caso antes de decidir.</aside>
            {guide.sections.map((section, index) => (
              <section key={section.title}>
                <span className="section-index">{String(index + 1).padStart(2, "0")}</span>
                <h2>{section.title}</h2>
                {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
                {index === 1 && <AdBanner placement="content" />}
              </section>
            ))}
          </div>
          <aside className="article-sidebar"><div><Calculator aria-hidden="true" /><h2>Prueba tus propios datos</h2><p>Convierte la explicación en un escenario personal y ajustable.</p><Link to="/#calculadoras">Abrir calculadora</Link></div></aside>
        </div>
      </article>
    </>
  );
};

export default GuideArticle;
