import { useEffect, type ReactNode } from "react";
import { Calculator, ChevronRight, Home, Menu, ShieldCheck } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { siteConfig } from "@/config/site";
import { useConsent } from "./ConsentManager";

const navigation = [
  { to: "/#calculadoras", label: "Calculadoras" },
  { to: "/guias", label: "Guías" },
  { to: "/metodologia", label: "Metodología" },
  { to: "/sobre-nosotros", label: "Sobre nosotros" },
];

const Brand = () => (
  <span className="brand">
    <span className="brand-mark" aria-hidden="true"><Home /><Calculator /></span>
    <span><strong>Tu Hipoteca</strong><small>Clara</small></span>
  </span>
);

const SiteLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const { openSettings } = useConsent();

  useEffect(() => {
    if (location.hash) {
      window.requestAnimationFrame(() => document.querySelector(location.hash)?.scrollIntoView({ behavior: "smooth" }));
    } else {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [location.pathname, location.hash]);

  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-link">Saltar al contenido</a>
      <header className="site-header">
        <div className="site-container header-inner">
          <Link to="/" aria-label={`${siteConfig.name}, inicio`}><Brand /></Link>
          <nav className="desktop-nav" aria-label="Navegación principal">
            {navigation.map((item) => (
              <NavLink key={item.to} to={item.to} className={({ isActive }) => isActive ? "active" : undefined}>{item.label}</NavLink>
            ))}
            <Link to="/contacto" className="nav-cta">Contactar <ChevronRight aria-hidden="true" /></Link>
          </nav>
          <details className="mobile-nav">
            <summary aria-label="Abrir menú"><Menu aria-hidden="true" /></summary>
            <nav aria-label="Navegación móvil">
              {navigation.map((item) => <Link key={item.to} to={item.to}>{item.label}</Link>)}
              <Link to="/contacto">Contactar</Link>
            </nav>
          </details>
        </div>
      </header>

      <main id="main-content">{children}</main>

      <footer className="site-footer">
        <div className="site-container footer-grid">
          <div>
            <Brand />
            <p>Herramientas gratuitas y transparentes para entender mejor una decisión financiera importante.</p>
            <span className="footer-trust"><ShieldCheck aria-hidden="true" /> Cálculos orientativos y metodología pública</span>
          </div>
          <div>
            <h2>Herramientas</h2>
            <Link to="/#calculadoras">Calcular cuota</Link>
            <Link to="/#calculadoras">Precio máximo</Link>
            <Link to="/metodologia">Cómo calculamos</Link>
          </div>
          <div>
            <h2>Aprender</h2>
            <Link to="/guias">Todas las guías</Link>
            <Link to="/guias/como-calcular-una-hipoteca">Cómo se calcula una hipoteca</Link>
            <Link to="/guias/gastos-de-comprar-vivienda">Gastos de compra</Link>
          </div>
          <div>
            <h2>Información</h2>
            <Link to="/sobre-nosotros">Sobre nosotros</Link>
            <Link to="/contacto">Contacto</Link>
            <Link to="/privacidad">Privacidad</Link>
            <Link to="/cookies">Cookies</Link>
            <Link to="/aviso-legal">Aviso legal</Link>
            <button type="button" onClick={openSettings}>Configurar privacidad</button>
          </div>
        </div>
        <div className="site-container footer-bottom">
          <span>© {new Date().getFullYear()} {siteConfig.name}</span>
          <span>No somos una entidad financiera. Los resultados no constituyen una oferta.</span>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
