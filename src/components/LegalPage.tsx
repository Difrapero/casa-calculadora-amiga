import type { ReactNode } from "react";
import Seo from "./Seo";

interface LegalPageProps {
  title: string;
  description: string;
  path: string;
  updated: string;
  children: ReactNode;
}

const LegalPage = ({ title, description, path, updated, children }: LegalPageProps) => (
  <>
    <Seo title={title} description={description} path={path} />
    <header className="page-hero compact"><div className="site-container article-width"><span className="eyebrow">Información legal</span><h1>{title}</h1><p>Última actualización: {updated}</p></div></header>
    <article className="site-container legal-content article-width">{children}</article>
  </>
);

export default LegalPage;
