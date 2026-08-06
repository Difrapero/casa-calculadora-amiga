import { BookOpenCheck, Calculator, CircleCheck, ExternalLink, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import Seo from "@/components/Seo";

const Methodology = () => (
  <>
    <Seo title="Metodología de las calculadoras" description="Fórmulas, hipótesis, límites y fuentes utilizadas por las calculadoras hipotecarias." path="/metodologia" />
    <header className="page-hero"><div className="site-container narrow"><span className="eyebrow"><BookOpenCheck aria-hidden="true" /> Transparencia</span><h1>Cómo calculamos y qué no podemos saber</h1><p>Publicamos las hipótesis para que puedas cuestionar, ajustar y comprender cada resultado.</p></div></header>
    <section className="content-section"><div className="site-container methodology-grid">
      <div className="method-card"><Calculator aria-hidden="true" /><h2>Cuota hipotecaria</h2><p>Aplicamos el sistema francés de cuotas mensuales constantes para un tipo que no cambia durante el plazo. Con interés cero, dividimos el capital entre el número de meses.</p><code>C = P × [r(1+r)ⁿ] / [(1+r)ⁿ−1]</code></div>
      <div className="method-card"><CircleCheck aria-hidden="true" /><h2>Precio máximo</h2><p>Calculamos el capital compatible con la cuota disponible y lo cruzamos con el precio que permiten los ahorros después de entrada y gastos. Recomendamos el menor límite.</p><code>Precio = min(límite por ingresos, límite por ahorros)</code></div>
      <div className="method-card"><RefreshCw aria-hidden="true" /><h2>Actualización</h2><p>Los porcentajes fiscales son editables porque varían por territorio, vivienda y comprador. Revisamos metodología y textos cuando cambia el producto o una fuente relevante.</p></div>
    </div></section>
    <section className="content-section muted-section"><div className="site-container article-width prose-block">
      <h2>Hipótesis principales</h2><ul><li>Pagos mensuales y meses de igual duración.</li><li>Sin carencias, amortizaciones anticipadas ni cambios de tipo salvo que se simulen expresamente.</li><li>Los gastos de compraventa se pagan con ahorro y no se añaden automáticamente al préstamo.</li><li>Las bonificaciones reducen puntos del TIN; no incorporamos el coste de seguros o productos vinculados.</li><li>El resultado no considera scoring, edad, estabilidad laboral, avales o políticas internas de cada entidad.</li></ul>
      <h2>Fuentes de contraste</h2><p>Contrastamos el enfoque financiero con los simuladores y materiales educativos del Banco de España. Los porcentajes fiscales deben verificarse con la administración autonómica correspondiente.</p>
      <a className="source-link" href="https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/" target="_blank" rel="noreferrer">Simuladores del Banco de España <ExternalLink aria-hidden="true" /></a>
      <h2>Detección de errores</h2><p>Si encuentras un caso que produce un resultado incoherente, envía los datos reproducibles —sin información personal— desde la página de contacto. Las fórmulas tienen pruebas automatizadas, pero agradecemos escenarios límite.</p>
      <Link className="primary-link inline-link" to="/#calculadoras">Probar las calculadoras</Link>
    </div></section>
  </>
);

export default Methodology;
