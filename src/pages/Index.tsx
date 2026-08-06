import { useCallback, useState } from "react";
import { ArrowRight, BookOpenCheck, Calculator, CheckCircle2, Scale, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MortgageCalculator from "@/components/MortgageCalculator";
import MaxPriceCalculator from "@/components/MaxPriceCalculator";
import LeadForm from "@/components/LeadForm";
import AdBanner from "@/components/AdBanner";
import Seo from "@/components/Seo";

const Index = () => {
  const [activeTab, setActiveTab] = useState("cuota");
  const [calculation, setCalculation] = useState<Record<string, string | number>>({ tipo: "cuota" });
  const handleResult = useCallback((result: Record<string, string | number>) => setCalculation(result), []);

  return (
    <>
      <Seo
        title="Calculadora hipotecaria: cuota, gastos y precio máximo"
        description="Calcula tu cuota hipotecaria, el ahorro necesario y el precio máximo de vivienda según ingresos, deudas y financiación. Metodología transparente."
      />

      <section className="hero-section">
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><Sparkles aria-hidden="true" /> Sin registros · Resultado inmediato</div>
            <h1>Entiende tu hipoteca antes de hablar con el banco</h1>
            <p>Calcula cuota, gastos y capacidad de compra con hipótesis visibles. Cambia cualquier dato y compara escenarios sin letra pequeña.</p>
            <div className="hero-actions">
              <a href="#calculadoras" className="primary-link">Empezar cálculo <ArrowRight aria-hidden="true" /></a>
              <Link to="/metodologia" className="secondary-link">Ver metodología</Link>
            </div>
            <ul className="trust-list" aria-label="Ventajas">
              <li><CheckCircle2 aria-hidden="true" /> Datos ajustables</li>
              <li><CheckCircle2 aria-hidden="true" /> Cálculo transparente</li>
              <li><CheckCircle2 aria-hidden="true" /> Privacidad por defecto</li>
            </ul>
          </div>
          <div className="hero-visual" aria-label="Vista resumida de una simulación hipotecaria">
            <div className="floating-card floating-card-main">
              <span>Cuota estimada</span>
              <strong>898 €<small>/mes</small></strong>
              <div className="mini-chart"><span /><span /><span /><span /><span /><span /></div>
            </div>
            <div className="floating-card floating-card-small"><Calculator aria-hidden="true" /><span>Todos los gastos<strong>Separados</strong></span></div>
            <div className="hero-house" aria-hidden="true"><span /><span /><span /></div>
          </div>
        </div>
      </section>

      <section className="proof-strip">
        <div className="site-container proof-grid">
          <div><Calculator aria-hidden="true" /><span><strong>2 calculadoras</strong>complementarias</span></div>
          <div><Scale aria-hidden="true" /><span><strong>Hipótesis visibles</strong>sin resultados mágicos</span></div>
          <div><ShieldCheck aria-hidden="true" /><span><strong>Sin cookies opcionales</strong>hasta que tú decidas</span></div>
          <div><BookOpenCheck aria-hidden="true" /><span><strong>Metodología pública</strong>y resultados explicados</span></div>
        </div>
      </section>

      <section id="calculadoras" className="calculator-section">
        <div className="site-container">
          <div className="section-heading centered">
            <span>Elige tu punto de partida</span>
            <h2>Una decisión, dos preguntas diferentes</h2>
            <p>Calcula una cuota concreta o descubre qué precio encaja con tus ingresos y ahorros.</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="calculator-tabs">
            <TabsList aria-label="Seleccionar calculadora">
              <TabsTrigger value="cuota"><Calculator aria-hidden="true" /><span>Ya sé el precio<small>Calcular cuota y gastos</small></span></TabsTrigger>
              <TabsTrigger value="precio"><Scale aria-hidden="true" /><span>Quiero saber mi límite<small>Calcular precio máximo</small></span></TabsTrigger>
            </TabsList>
            <TabsContent value="cuota"><MortgageCalculator onResultChange={handleResult} /></TabsContent>
            <TabsContent value="precio"><MaxPriceCalculator onResultChange={handleResult} /></TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="lead-section">
        <div className="site-container lead-section-grid">
          <div className="lead-section-copy">
            <span className="eyebrow">Siguiente paso opcional</span>
            <h2>¿Quieres que revisemos tu escenario?</h2>
            <p>Adjuntaremos el resultado actual para que una persona pueda entender tu situación antes de contactarte.</p>
            <ul>
              <li><CheckCircle2 aria-hidden="true" /> Sin repetir los datos del cálculo</li>
              <li><CheckCircle2 aria-hidden="true" /> Tú eliges el canal de contacto</li>
              <li><CheckCircle2 aria-hidden="true" /> Consentimiento comercial separado y opcional</li>
            </ul>
          </div>
          <LeadForm calculation={calculation} />
        </div>
      </section>

      <section className="learning-section">
        <div className="site-container">
          <div className="section-heading">
            <span>Aprende antes de decidir</span>
            <h2>La cuota no cuenta toda la historia</h2>
            <p>Una buena comparación incluye ahorro inicial, impuestos, productos vinculados, coste total y margen mensual.</p>
          </div>
          <div className="guide-grid">
            <Link to="/guias/como-calcular-una-hipoteca" className="guide-card"><span>01</span><h3>Cómo se calcula una hipoteca</h3><p>Cuota francesa, TIN, TAE e intereses explicados sin tecnicismos innecesarios.</p><strong>Leer guía <ArrowRight aria-hidden="true" /></strong></Link>
            <Link to="/guias/gastos-de-comprar-vivienda" className="guide-card"><span>02</span><h3>Gastos de comprar vivienda</h3><p>Entrada, impuestos y otros costes que deben quedar fuera del préstamo.</p><strong>Leer guía <ArrowRight aria-hidden="true" /></strong></Link>
            <Link to="/guias/cuanto-puedo-pagar" className="guide-card"><span>03</span><h3>Cuánto puedes pagar de verdad</h3><p>Cómo cruzar ingresos, otras deudas, ahorros y financiación máxima.</p><strong>Leer guía <ArrowRight aria-hidden="true" /></strong></Link>
          </div>
          <AdBanner placement="content" className="mt-10" />
        </div>
      </section>

      <section className="faq-section">
        <div className="site-container faq-grid">
          <div className="section-heading"><span>Preguntas frecuentes</span><h2>Respuestas claras antes de empezar</h2></div>
          <div className="faq-list">
            <details><summary>¿El resultado es una oferta hipotecaria?</summary><p>No. Es una estimación informativa basada en los datos que introduces. La entidad analizará ingresos, estabilidad laboral, deudas, tasación y sus propios criterios de riesgo.</p></details>
            <details><summary>¿Por qué se separa la cuota del ahorro inicial?</summary><p>Porque los impuestos y gran parte de los gastos de compraventa normalmente no forman parte de la financiación. Una cuota asumible no garantiza disponer del efectivo necesario para firmar.</p></details>
            <details><summary>¿Qué diferencia hay entre TIN y TAE?</summary><p>El TIN representa el interés nominal. La TAE incorpora además determinados gastos y la frecuencia de los pagos, por lo que es más útil al comparar ofertas homogéneas.</p></details>
            <details><summary>¿Guardáis los datos de la calculadora?</summary><p>El cálculo se realiza en tu navegador. Solo enviamos información personal y el resumen si completas voluntariamente la solicitud de contacto.</p></details>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
