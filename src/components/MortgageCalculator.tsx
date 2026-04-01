import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const COMISION_PCT = 0.03;
const NOTARIA_FIJA = 2000;

interface BonificacionState {
  seguroHogar: boolean;
  seguroVida: boolean;
  nomina: boolean;
  tarjetaCredito: boolean;
  seguroImpagos: boolean;
}

const BONIFICACIONES: { key: keyof BonificacionState; label: string; descuento: number }[] = [
  { key: "seguroHogar", label: "Seguro Hogar", descuento: 0.10 },
  { key: "seguroVida", label: "Seguro Vida", descuento: 0.10 },
  { key: "nomina", label: "Nómina", descuento: 0.15 },
  { key: "tarjetaCredito", label: "Tarjeta de Crédito", descuento: 0.05 },
  { key: "seguroImpagos", label: "Seguro de Impagos", descuento: 0.10 },
];

const MortgageCalculator = () => {
  const [precioCompra, setPrecioCompra] = useState("");
  const [inicialPct, setInicialPct] = useState(0.2);
  const [itpPorcentaje, setItpPorcentaje] = useState("");
  const [interes, setInteres] = useState("");
  const [anos, setAnos] = useState("");
  const [cuota, setCuota] = useState<number | null>(null);
  const [bonificaciones, setBonificaciones] = useState<BonificacionState>({
    seguroHogar: false,
    seguroVida: false,
    nomina: false,
    tarjetaCredito: false,
    seguroImpagos: false,
  });

  const precio = parseFloat(precioCompra) || 0;
  const inicial = precio * inicialPct;
  const itp = parseFloat(itpPorcentaje) || 0;
  const impuestos = precio * (itp / 100);
  const comision = precio * COMISION_PCT;
  const capitalAporte = inicial + impuestos + comision + NOTARIA_FIJA;
  const capitalPendiente = precio - inicial;

  const totalBonificacion = BONIFICACIONES.reduce((acc, b) => {
    return acc + (bonificaciones[b.key] ? b.descuento : 0);
  }, 0);

  const calcular = useCallback(() => {
    const i = parseFloat(interes);
    const a = parseInt(anos);
    if (!capitalPendiente || !i || !a) return;

    const interesAjustado = Math.max(i - totalBonificacion, 0);
    const r = (interesAjustado / 100) / 12;
    const n = a * 12;

    if (r === 0) {
      setCuota(capitalPendiente / n);
    } else {
      const c = capitalPendiente * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setCuota(c);
    }
  }, [capitalPendiente, interes, anos, totalBonificacion]);

  const toggleBonificacion = (key: keyof BonificacionState) => {
    setBonificaciones(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const formatEur = (val: number) => val.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-center text-foreground mb-6">
          Calculadora Hipotecaria
        </h2>

        <div className="space-y-4">
          <div>
            <Label>Precio de Compra (€)</Label>
            <Input
              type="number"
              value={precioCompra}
              onChange={(e) => setPrecioCompra(e.target.value)}
              placeholder="200.000"
            />
          </div>

          <div>
            <Label>Aporte Inicial (€): {formatEur(inicial)}</Label>
            <div className="flex gap-2 mt-1">
              {[0.1, 0.2, 0.3].map((p) => (
                <Button
                  key={p}
                  variant={inicialPct === p ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => setInicialPct(p)}
                >
                  {p * 100}%
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label>ITP (%)</Label>
            <Input
              type="number"
              step="0.1"
              value={itpPorcentaje}
              onChange={(e) => setItpPorcentaje(e.target.value)}
              placeholder="8"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-muted-foreground text-sm">Impuestos (€)</Label>
              <Input value={formatEur(impuestos)} disabled />
            </div>
            <div>
              <Label className="text-muted-foreground text-sm">Comisión 3% (€)</Label>
              <Input value={formatEur(comision)} disabled />
            </div>
            <div>
              <Label className="text-muted-foreground text-sm">Notaría (€)</Label>
              <Input value={formatEur(NOTARIA_FIJA)} disabled />
            </div>
            <div>
              <Label className="text-muted-foreground text-sm">Capital Aporte (€)</Label>
              <Input value={formatEur(capitalAporte)} disabled />
            </div>
          </div>

          <div>
            <Label className="text-primary font-semibold">Capital Pendiente (€)</Label>
            <Input value={formatEur(capitalPendiente)} disabled className="font-semibold" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Interés (%)</Label>
              <Input
                type="number"
                step="0.01"
                value={interes}
                onChange={(e) => setInteres(e.target.value)}
                placeholder="3.5"
              />
            </div>
            <div>
              <Label>Años</Label>
              <Input
                type="number"
                value={anos}
                onChange={(e) => setAnos(e.target.value)}
                placeholder="30"
              />
            </div>
          </div>

          <Button onClick={calcular} className="w-full text-lg py-6">
            Calcular
          </Button>

          {cuota !== null && (
            <div className="text-center p-4 bg-accent rounded-lg">
              <p className="text-muted-foreground text-sm">Cuota mensual</p>
              <p className="text-3xl font-bold text-primary">{formatEur(cuota)} €</p>
              {totalBonificacion > 0 && (
                <p className="text-sm text-success mt-1">
                  Bonificación aplicada: -{totalBonificacion.toFixed(2)}%
                </p>
              )}
            </div>
          )}
        </div>
      </Card>

      {/* Bonificaciones */}
      <Card className="p-6 shadow-lg">
        <h3 className="text-lg font-bold text-foreground mb-4">
          Bonificaciones de interés
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Selecciona los productos contratados para reducir tu tipo de interés:
        </p>
        <div className="space-y-3">
          {BONIFICACIONES.map((b) => (
            <label
              key={b.key}
              className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-accent/50 cursor-pointer transition-colors"
            >
              <Checkbox
                checked={bonificaciones[b.key]}
                onCheckedChange={() => toggleBonificacion(b.key)}
              />
              <span className="flex-1 font-medium">{b.label}</span>
              <span className="text-sm text-primary font-semibold">-{b.descuento.toFixed(2)}%</span>
            </label>
          ))}
        </div>
        {totalBonificacion > 0 && (
          <div className="mt-4 p-3 bg-accent rounded-lg text-center">
            <p className="text-sm text-muted-foreground">Reducción total del interés</p>
            <p className="text-xl font-bold text-primary">-{totalBonificacion.toFixed(2)}%</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default MortgageCalculator;
