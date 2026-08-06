import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, BadgeEuro, PiggyBank, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { calculateMaxPurchase, formatCurrency } from "@/lib/mortgage";
import { trackEvent } from "@/lib/analytics";

interface MaxPriceCalculatorProps {
  onResultChange?: (result: Record<string, string | number>) => void;
}

const toNumber = (value: string) => Number.parseFloat(value.replace(",", ".")) || 0;

const MaxPriceCalculator = ({ onResultChange }: MaxPriceCalculatorProps) => {
  const [income, setIncome] = useState("3200");
  const [debts, setDebts] = useState("250");
  const [effortRate, setEffortRate] = useState("35");
  const [interestRate, setInterestRate] = useState("3.25");
  const [termYears, setTermYears] = useState("30");
  const [loanToValue, setLoanToValue] = useState("80");
  const [savings, setSavings] = useState("60000");
  const [costsRate, setCostsRate] = useState("10");

  const { result, error } = useMemo(() => {
    try {
      return {
        result: calculateMaxPurchase({
          monthlyNetIncome: toNumber(income),
          otherMonthlyDebts: toNumber(debts),
          effortRate: toNumber(effortRate),
          annualInterestRate: toNumber(interestRate),
          termYears: toNumber(termYears),
          maxLoanToValue: toNumber(loanToValue),
          availableSavings: toNumber(savings),
          purchaseCostsRate: toNumber(costsRate),
        }),
        error: null,
      };
    } catch (calculationError) {
      return {
        result: null,
        error: calculationError instanceof Error ? calculationError.message : "Revisa los datos.",
      };
    }
  }, [income, debts, effortRate, interestRate, termYears, loanToValue, savings, costsRate]);

  useEffect(() => {
    if (!result) return;
    onResultChange?.({
      tipo: "precio_maximo",
      ingresos_mensuales: toNumber(income),
      otras_deudas: toNumber(debts),
      ahorros: toNumber(savings),
      precio_recomendado: Math.round(result.recommendedMaxPrice),
      cuota_maxima: Math.round(result.maxMonthlyPayment),
      factor_limitante: result.limitingFactor,
    });
  }, [result, income, debts, savings, onResultChange]);

  useEffect(() => {
    if (!result) return;
    const timer = window.setTimeout(() => {
      trackEvent("calculation_completed", {
        calculator_type: "max_purchase_price",
        recommended_price: Math.round(result.recommendedMaxPrice),
        limiting_factor: result.limitingFactor,
      });
    }, 700);
    return () => window.clearTimeout(timer);
  }, [result]);

  return (
    <section aria-labelledby="max-price-title" className="calculator-shell">
      <div className="calculator-inputs">
        <div className="section-kicker"><BadgeEuro aria-hidden="true" /> Capacidad de compra</div>
        <h2 id="max-price-title" className="section-title">¿Qué vivienda puedes permitirte?</h2>
        <p className="section-copy">
          Calculamos dos límites: el de tus ingresos y el de tus ahorros. El menor de ambos marca una referencia prudente.
        </p>

        <div className="form-grid mt-6">
          <div className="field-group">
            <Label htmlFor="monthly-income">Ingresos netos del hogar</Label>
            <div className="input-suffix-wrap"><Input id="monthly-income" min="0" type="number" value={income} onChange={(event) => setIncome(event.target.value)} /><span>€/mes</span></div>
          </div>
          <div className="field-group">
            <Label htmlFor="monthly-debts">Otras cuotas mensuales</Label>
            <div className="input-suffix-wrap"><Input id="monthly-debts" min="0" type="number" value={debts} onChange={(event) => setDebts(event.target.value)} /><span>€/mes</span></div>
          </div>
          <div className="field-group">
            <Label htmlFor="max-effort">Esfuerzo máximo</Label>
            <div className="input-suffix-wrap"><Input id="max-effort" min="1" max="100" type="number" value={effortRate} onChange={(event) => setEffortRate(event.target.value)} /><span>%</span></div>
          </div>
          <div className="field-group">
            <Label htmlFor="max-interest">TIN estimado</Label>
            <div className="input-suffix-wrap"><Input id="max-interest" min="0" max="30" step="0.01" type="number" value={interestRate} onChange={(event) => setInterestRate(event.target.value)} /><span>%</span></div>
          </div>
          <div className="field-group">
            <Label htmlFor="max-years">Plazo</Label>
            <div className="input-suffix-wrap"><Input id="max-years" min="1" max="50" type="number" value={termYears} onChange={(event) => setTermYears(event.target.value)} /><span>años</span></div>
          </div>
          <div className="field-group">
            <Label htmlFor="max-ltv">Financiación máxima</Label>
            <div className="input-suffix-wrap"><Input id="max-ltv" min="1" max="100" type="number" value={loanToValue} onChange={(event) => setLoanToValue(event.target.value)} /><span>%</span></div>
          </div>
          <div className="field-group">
            <Label htmlFor="available-savings">Ahorros disponibles</Label>
            <div className="input-suffix-wrap"><Input id="available-savings" min="0" type="number" value={savings} onChange={(event) => setSavings(event.target.value)} /><span>€</span></div>
          </div>
          <div className="field-group">
            <Label htmlFor="purchase-costs">Gastos de compra estimados</Label>
            <div className="input-suffix-wrap"><Input id="purchase-costs" min="0" max="40" step="0.1" type="number" value={costsRate} onChange={(event) => setCostsRate(event.target.value)} /><span>%</span></div>
          </div>
        </div>

        <div className="method-note mt-6">
          <AlertTriangle aria-hidden="true" />
          <p>Este cálculo no es una oferta bancaria. Conserva un fondo de emergencia fuera de los ahorros destinados a la compra.</p>
        </div>
      </div>

      <Card className="result-panel" aria-live="polite">
        <div className="result-panel-header"><span>Resultado orientativo</span></div>
        {error || !result ? (
          <div className="result-empty"><AlertTriangle aria-hidden="true" /><p>{error ?? "Completa los datos."}</p></div>
        ) : (
          <>
            <div className="primary-result">
              <span>Precio máximo recomendado</span>
              <strong>{formatCurrency(result.recommendedMaxPrice)}</strong>
              <small>Limitado por tus {result.limitingFactor === "savings" ? "ahorros disponibles" : "ingresos y deudas"}</small>
            </div>

            <div className="metric-grid">
              <div className="metric-card"><TrendingUp aria-hidden="true" /><span>Cuota máxima</span><strong>{formatCurrency(result.maxMonthlyPayment)}</strong><small>al mes</small></div>
              <div className="metric-card"><PiggyBank aria-hidden="true" /><span>Ahorro utilizado</span><strong>{formatCurrency(result.estimatedCashNeeded)}</strong><small>entrada + gastos</small></div>
            </div>

            <dl className="result-breakdown">
              <div><dt>Préstamo estimado</dt><dd>{formatCurrency(result.estimatedLoan)}</dd></div>
              <div><dt>Límite por ingresos</dt><dd>{formatCurrency(result.maxPriceByFinancing)}</dd></div>
              <div><dt>Límite por ahorros</dt><dd>{Number.isFinite(result.maxPriceBySavings) ? formatCurrency(result.maxPriceBySavings) : "Sin límite"}</dd></div>
              <div><dt>Ahorro que quedaría</dt><dd>{formatCurrency(Math.max(toNumber(savings) - result.estimatedCashNeeded, 0))}</dd></div>
            </dl>

            <div className="savings-callout">
              Para ampliar tu margen, prueba a reducir otras cuotas, aumentar la entrada o ajustar el precio objetivo. No eleves el esfuerzo sin valorar tus gastos habituales.
            </div>
          </>
        )}
      </Card>
    </section>
  );
};

export default MaxPriceCalculator;
