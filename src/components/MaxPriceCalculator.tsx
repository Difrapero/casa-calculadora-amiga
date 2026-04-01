import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MaxPriceCalculator = () => {
  const [ingresos, setIngresos] = useState("");
  const [endeudamiento, setEndeudamiento] = useState("0.30");
  const [interes, setInteres] = useState("");
  const [anos, setAnos] = useState("");
  const [resultado, setResultado] = useState<{ cuotaMax: number; capital: number; precio: number } | null>(null);

  const calcular = useCallback(() => {
    const ing = parseFloat(ingresos);
    const pct = parseFloat(endeudamiento);
    const i = parseFloat(interes);
    const a = parseInt(anos);
    if (!ing || !pct || !i || !a) return;

    const cuotaMax = ing * pct;
    const r = (i / 100) / 12;
    const n = a * 12;

    const capital = cuotaMax * ((Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n)));

    setResultado({ cuotaMax, capital, precio: capital });
  }, [ingresos, endeudamiento, interes, anos]);

  const formatEur = (val: number) => val.toLocaleString("es-ES", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <Card className="p-6 shadow-lg max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-center text-foreground mb-6">
        Precio Máximo de Compra
      </h2>

      <div className="space-y-4">
        <div>
          <Label>Ingresos netos mensuales (€)</Label>
          <Input
            type="number"
            value={ingresos}
            onChange={(e) => setIngresos(e.target.value)}
            placeholder="2.500"
          />
        </div>

        <div>
          <Label>Endeudamiento máximo</Label>
          <Select value={endeudamiento} onValueChange={setEndeudamiento}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0.30">30%</SelectItem>
              <SelectItem value="0.40">40%</SelectItem>
            </SelectContent>
          </Select>
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

        {resultado && (
          <div className="space-y-3 mt-4">
            <div className="p-3 bg-accent rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Cuota máxima mensual</p>
              <p className="text-2xl font-bold text-primary">{formatEur(resultado.cuotaMax)} €</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-accent rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Capital máximo</p>
                <p className="text-xl font-bold text-foreground">{formatEur(resultado.capital)} €</p>
              </div>
              <div className="p-3 bg-accent rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Precio máximo</p>
                <p className="text-xl font-bold text-foreground">{formatEur(resultado.precio)} €</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default MaxPriceCalculator;
