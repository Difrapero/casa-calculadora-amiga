import { useEffect, useMemo, useState } from "react";
import { Calculator, Check, Info, Landmark, WalletCards } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  buildAmortizationSchedule,
  calculateMortgage,
  formatCurrency,
  type MortgageResult,
  type PurchaseType,
} from "@/lib/mortgage";
import { trackEvent } from "@/lib/analytics";

interface MortgageCalculatorProps {
  onResultChange?: (result: Record<string, string | number>) => void;
}

const BONUSES = [
  { key: "salary", label: "Domiciliar nómina", points: 0.15 },
  { key: "home", label: "Seguro de hogar", points: 0.1 },
  { key: "life", label: "Seguro de vida", points: 0.1 },
  { key: "card", label: "Uso de tarjeta", points: 0.05 },
] as const;

const toNumber = (value: string) => Number.parseFloat(value.replace(",", ".")) || 0;

const MortgageCalculator = ({ onResultChange }: MortgageCalculatorProps) => {
  const [purchasePrice, setPurchasePrice] = useState("250000");
  const [downPaymentPercent, setDownPaymentPercent] = useState("20");
  const [interestRate, setInterestRate] = useState("3.25");
  const [termYears, setTermYears] = useState("30");
  const [purchaseType, setPurchaseType] = useState<PurchaseType>("used");
  const [transferTaxRate, setTransferTaxRate] = useState("8");
  const [vatRate, setVatRate] = useState("10");
  const [ajdRate, setAjdRate] = useState("1.5");
  const [otherCosts, setOtherCosts] = useState("3500");
  const [agencyFeeRate, setAgencyFeeRate] = useState("0");
  const [bonuses, setBonuses] = useState<Record<string, boolean>>({});
  const [showDetails, setShowDetails] = useState(false);

  const bonusPoints = BONUSES.reduce(
    (total, bonus) => total + (bonuses[bonus.key] ? bonus.points : 0),
    0,
  );

  const { result, error } = useMemo<{ result: MortgageResult | null; error: string | null }>(() => {
    try {
      return {
        result: calculateMortgage({
          purchasePrice: toNumber(purchasePrice),
          downPaymentPercent: toNumber(downPaymentPercent),
          annualInterestRate: toNumber(interestRate),
          termYears: toNumber(termYears),
          purchaseType,
          transferTaxRate: toNumber(transferTaxRate),
          vatRate: toNumber(vatRate),
          ajdRate: toNumber(ajdRate),
          otherCosts: toNumber(otherCosts),
          agencyFeeRate: toNumber(agencyFeeRate),
          bonusPoints,
        }),
        error: null,
      };
    } catch (calculationError) {
      return {
        result: null,
        error: calculationError instanceof Error ? calculationError.message : "Revisa los datos.",
      };
    }
  }, [
    purchasePrice,
    downPaymentPercent,
    interestRate,
    termYears,
    purchaseType,
    transferTaxRate,
    vatRate,
    ajdRate,
    otherCosts,
    agencyFeeRate,
    bonusPoints,
  ]);

  const firstYear = useMemo(() => {
    if (!result) return [];
    return buildAmortizationSchedule(
      result.loanAmount,
      result.effectiveInterestRate,
      toNumber(termYears),
    ).slice(0, 12);
  }, [result, termYears]);

  useEffect(() => {
    if (!result) return;
    onResultChange?.({
      tipo: "cuota",
      precio_compra: toNumber(purchasePrice),
      entrada_porcentaje: toNumber(downPaymentPercent),
      capital: Math.round(result.loanAmount),
      cuota: Math.round(result.adjustedMonthlyPayment),
      plazo_anos: toNumber(termYears),
      tin: result.effectiveInterestRate,
      ahorro_necesario: Math.round(result.cashNeeded),
    });
  }, [result, purchasePrice, downPaymentPercent, termYears, onResultChange]);

  const announceCalculation = () => {
    if (!result) return;
    trackEvent("calculation_completed", {
      calculator_type: "mortgage_payment",
      loan_amount: Math.round(result.loanAmount),
      monthly_payment: Math.round(result.adjustedMonthlyPayment),
    });
    setShowDetails(true);
  };

  return (
    <section aria-labelledby="mortgage-calculator-title" className="calculator-shell">
      <div className="calculator-inputs">
        <div className="section-kicker">
          <Calculator aria-hidden="true" />
          Simulación de cuota
        </div>
        <h2 id="mortgage-calculator-title" className="section-title">
          Calcula tu hipoteca con todos los gastos
        </h2>
        <p className="section-copy">
          Ajusta los datos. El resultado se actualiza al momento y separa financiación, impuestos y ahorro inicial.
        </p>

        <div className="form-grid mt-6">
          <div className="field-group field-wide">
            <Label htmlFor="purchase-price">Precio de la vivienda</Label>
            <div className="input-suffix-wrap">
              <Input
                id="purchase-price"
                inputMode="decimal"
                min="10000"
                max="10000000"
                type="number"
                value={purchasePrice}
                onChange={(event) => setPurchasePrice(event.target.value)}
              />
              <span>€</span>
            </div>
          </div>

          <div className="field-group">
            <Label htmlFor="down-payment">Entrada</Label>
            <div className="input-suffix-wrap">
              <Input
                id="down-payment"
                min="0"
                max="100"
                type="number"
                value={downPaymentPercent}
                onChange={(event) => setDownPaymentPercent(event.target.value)}
              />
              <span>%</span>
            </div>
          </div>

          <div className="field-group">
            <Label htmlFor="interest-rate">TIN anual</Label>
            <div className="input-suffix-wrap">
              <Input
                id="interest-rate"
                min="0"
                max="30"
                step="0.01"
                type="number"
                value={interestRate}
                onChange={(event) => setInterestRate(event.target.value)}
              />
              <span>%</span>
            </div>
          </div>

          <div className="field-group">
            <Label htmlFor="term-years">Plazo</Label>
            <div className="input-suffix-wrap">
              <Input
                id="term-years"
                min="1"
                max="50"
                type="number"
                value={termYears}
                onChange={(event) => setTermYears(event.target.value)}
              />
              <span>años</span>
            </div>
          </div>

          <fieldset className="field-group field-wide">
            <legend className="field-legend">Tipo de vivienda</legend>
            <div className="segmented-control">
              <Button
                type="button"
                variant={purchaseType === "used" ? "default" : "ghost"}
                onClick={() => setPurchaseType("used")}
                aria-pressed={purchaseType === "used"}
              >
                Segunda mano
              </Button>
              <Button
                type="button"
                variant={purchaseType === "new" ? "default" : "ghost"}
                onClick={() => setPurchaseType("new")}
                aria-pressed={purchaseType === "new"}
              >
                Obra nueva
              </Button>
            </div>
          </fieldset>

          {purchaseType === "used" ? (
            <div className="field-group">
              <Label htmlFor="itp-rate">ITP estimado</Label>
              <div className="input-suffix-wrap">
                <Input id="itp-rate" min="0" max="20" step="0.1" type="number" value={transferTaxRate} onChange={(event) => setTransferTaxRate(event.target.value)} />
                <span>%</span>
              </div>
            </div>
          ) : (
            <>
              <div className="field-group">
                <Label htmlFor="vat-rate">IVA estimado</Label>
                <div className="input-suffix-wrap">
                  <Input id="vat-rate" min="0" max="30" step="0.1" type="number" value={vatRate} onChange={(event) => setVatRate(event.target.value)} />
                  <span>%</span>
                </div>
              </div>
              <div className="field-group">
                <Label htmlFor="ajd-rate">AJD estimado</Label>
                <div className="input-suffix-wrap">
                  <Input id="ajd-rate" min="0" max="5" step="0.1" type="number" value={ajdRate} onChange={(event) => setAjdRate(event.target.value)} />
                  <span>%</span>
                </div>
              </div>
            </>
          )}

          <div className="field-group">
            <Label htmlFor="other-costs">Notaría, registro y tasación</Label>
            <div className="input-suffix-wrap">
              <Input id="other-costs" min="0" type="number" value={otherCosts} onChange={(event) => setOtherCosts(event.target.value)} />
              <span>€</span>
            </div>
          </div>

          <div className="field-group">
            <Label htmlFor="agency-fee">Honorarios de agencia a tu cargo</Label>
            <div className="input-suffix-wrap">
              <Input id="agency-fee" min="0" max="20" step="0.1" type="number" value={agencyFeeRate} onChange={(event) => setAgencyFeeRate(event.target.value)} />
              <span>%</span>
            </div>
          </div>
        </div>

        <details className="bonus-panel mt-6">
          <summary>Simular bonificaciones del banco</summary>
          <p>La reducción se aplica en puntos porcentuales al TIN. Compara también el coste real de cada producto.</p>
          <div className="bonus-grid">
            {BONUSES.map((bonus) => (
              <label key={bonus.key} className="bonus-option">
                <Checkbox
                  checked={Boolean(bonuses[bonus.key])}
                  onCheckedChange={(checked) => setBonuses((current) => ({ ...current, [bonus.key]: Boolean(checked) }))}
                />
                <span>{bonus.label}</span>
                <strong>−{bonus.points.toFixed(2)} p.p.</strong>
              </label>
            ))}
          </div>
        </details>
      </div>

      <Card className="result-panel" aria-live="polite">
        <div className="result-panel-header">
          <span>Tu estimación</span>
          {result && <span className="result-status"><Check aria-hidden="true" /> Actualizada</span>}
        </div>

        {error || !result ? (
          <div className="result-empty">
            <Info aria-hidden="true" />
            <p>{error ?? "Completa los datos para obtener el resultado."}</p>
          </div>
        ) : (
          <>
            <div className="primary-result">
              <span>Cuota mensual estimada</span>
              <strong>{formatCurrency(result.adjustedMonthlyPayment)}</strong>
              <small>TIN aplicado: {result.effectiveInterestRate.toFixed(2)} %</small>
            </div>

            <div className="metric-grid">
              <div className="metric-card">
                <Landmark aria-hidden="true" />
                <span>Financiación</span>
                <strong>{formatCurrency(result.loanAmount)}</strong>
                <small>{result.loanToValue.toFixed(0)} % del precio</small>
              </div>
              <div className="metric-card">
                <WalletCards aria-hidden="true" />
                <span>Ahorro inicial</span>
                <strong>{formatCurrency(result.cashNeeded)}</strong>
                <small>Entrada + gastos</small>
              </div>
            </div>

            <dl className="result-breakdown">
              <div><dt>Entrada</dt><dd>{formatCurrency(result.downPayment)}</dd></div>
              <div><dt>Impuestos estimados</dt><dd>{formatCurrency(result.taxes)}</dd></div>
              <div><dt>Otros gastos</dt><dd>{formatCurrency(toNumber(otherCosts) + result.agencyFee)}</dd></div>
              <div><dt>Intereses totales</dt><dd>{formatCurrency(result.totalInterest)}</dd></div>
              <div className="result-total"><dt>Total devuelto al banco</dt><dd>{formatCurrency(result.totalRepayment)}</dd></div>
            </dl>

            {bonusPoints > 0 && (
              <div className="savings-callout">
                Con las bonificaciones, la cuota baja aproximadamente {formatCurrency(result.baseMonthlyPayment - result.adjustedMonthlyPayment)} al mes. Revisa el coste de los productos vinculados.
              </div>
            )}

            <Button type="button" className="w-full" size="lg" onClick={announceCalculation}>
              Ver detalle del primer año
            </Button>

            {showDetails && (
              <div className="amortization-preview">
                <h3>Primer año de amortización</h3>
                <div className="amortization-legend"><span>Capital</span><span>Intereses</span></div>
                {firstYear.map((row) => {
                  const principalShare = row.payment === 0 ? 0 : (row.principal / row.payment) * 100;
                  return (
                    <div key={row.month} className="amortization-row">
                      <span>M{row.month}</span>
                      <div className="amortization-bar" aria-label={`Mes ${row.month}: ${formatCurrency(row.principal)} de capital y ${formatCurrency(row.interest)} de intereses`}>
                        <span style={{ width: `${principalShare}%` }} />
                      </div>
                      <strong>{formatCurrency(row.balance)}</strong>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </Card>
    </section>
  );
};

export default MortgageCalculator;
